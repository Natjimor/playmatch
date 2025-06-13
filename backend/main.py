from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uvicorn
import httpx
from dotenv import load_dotenv
from typing import List, Dict, Optional, Any
from datetime import datetime
import numpy as np

# Cargar variables .env
load_dotenv()

# Configurar FastAPI
app = FastAPI(title="Playmatch API")

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, especificar dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de datos
class UserLogin(BaseModel):
    username: str
    user_id: str

class JoinGroupRequest(BaseModel):
    user_id: str
    username: str
    group_id: str

class UserAuthInfo(BaseModel):
    username: str
    user_id: str
    login_time: str
    status: str
    last_active: Optional[str] = None
    vector: Optional[list] = None

# Almacén temporal para los usuarios logueados (en un entorno real sería una base de datos)
logged_users: Dict[str, UserAuthInfo] = {}

# Inicializar Supabase si es posible
try:
    from supabase import create_client, Client
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")
    
    if not SUPABASE_URL or not SUPABASE_KEY:
        print("\n⚠️ Advertencia: Variables de entorno SUPABASE_URL o SUPABASE_KEY no encontradas.")
        print("⚠️ Algunas funciones relacionadas con la base de datos no estarán disponibles.")
        print("⚠️ Crea un archivo .env con estas variables para habilitar todas las funciones.\n")
        supabase = None
    else:
        supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
        print("\n✅ Conexión con Supabase establecida correctamente.\n")
        
except ImportError:
    print("\n⚠️ Error: No se pudo importar el módulo de Supabase.")
    print("⚠️ Instala la dependencia con: pip install supabase\n")
    supabase = None
except Exception as e:
    print(f"\n⚠️ Error al inicializar Supabase: {e}\n")
    supabase = None

@app.get("/api/users")
async def get_users():
    if not supabase:
        return {"users": [{"id": "demo-1", "username": "usuario_ejemplo"}]}
    
    try:
        # Llamar a una tabla llamada "users"
        response = supabase.table('users').select('*').execute()
        data = response.data
        return {"users": data}
    except Exception as e:
        print(f"Error al obtener usuarios: {e}")
        raise HTTPException(status_code=500, detail=f"Error al conectar con la base de datos: {str(e)}")


def normalize_vector(vector):
    max_value = max(vector)
    return [round(x / max_value, 3) if max_value > 0 else 0 for x in vector]

@app.get("/api/user_vector/{user_id}")
async def get_user_vector(user_id: str):
    if not supabase:
        # Datos de ejemplo si no hay conexión a Supabase
        dummy_vector = [5, 3, 7, 2, 1, 4, 6, 3, 2, 5, 2, 1, 0, 3, 1, 2, 0, 1, 0, 120]
        normalized = normalize_vector(dummy_vector)
        return {
            'user_id': user_id,
            'username': 'usuario_ejemplo',
            'original_vector': dummy_vector,
            'normalized_vector': normalized
        }
    
    try:
        # Obtener todos los usuarios desde Supabase
        response = supabase.table('users').select('*').eq('id', user_id).execute()
        data = response.data

        if not data:
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

        user = data[0]

        # Orden esperado
        order = [
            'action', 'indie', 'adventure', 'rpg', 'strategy', 'shooter', 'casual',
            'simulation', 'puzzle', 'arcade', 'platformer', 'board_games',
            'racing', 'sports', 'fighting', 'family', 'card', 'educational',
            'game_antique', 'playtime_today_minutes'
        ]

        # Si 'board_games' no existe en tu tabla, asegúrate de crearla o poner 0 aquí
        user_vector = [user.get(field, 0) for field in order]

        normalized = normalize_vector(user_vector)

        return {
            'user_id': user['id'],
            'username': user['username'],
            'original_vector': user_vector,
            'normalized_vector': normalized
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error al obtener vector de usuario: {e}")
        raise HTTPException(status_code=500, detail=f"Error al obtener datos del usuario: {str(e)}")

@app.post("/api/user_login")
async def user_login(user: UserLogin):
    # Mostrar en la consola del backend
    print("\n=====================================================\n")
    print(f"✓ Usuario logueado: {user.username}")
    print(f"✓ ID del usuario: {user.user_id}")
    print("=====================================================\n")
    
    # Registrar el usuario en nuestro almacén temporal
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logged_users[user.user_id] = UserAuthInfo(
        username=user.username,
        user_id=user.user_id,
        login_time=current_time,
        status="active"
    )
    
    # Devolver los datos para confirmar
    return {
        'status': 'success',
        'message': 'Datos de login recibidos correctamente',
        'user': {
            'username': user.username,
            'user_id': user.user_id,
            'login_time': current_time
        }
    }

@app.get("/api/auth/users")
async def get_authenticated_users():
    """Endpoint para obtener la lista de usuarios autenticados"""
    # Actualizar la hora de última actividad de todos los usuarios
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    for user_id in logged_users:
        logged_users[user_id].last_active = current_time
        
    return {
        'status': 'success',
        'count': len(logged_users),
        'users': list(logged_users.values())
    }

@app.get("/api/auth/user/{user_id}")
async def get_auth_user(user_id: str):
    """Endpoint para obtener información de un usuario autenticado específico"""
    if user_id not in logged_users:
        raise HTTPException(status_code=404, detail="Usuario no encontrado o no ha iniciado sesión")
    
    # Actualizar la hora de última actividad
    logged_users[user_id].last_active = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    
    return {
        'status': 'success',
        'user': logged_users[user_id]
    }

@app.get("/api/current_user/vector")
async def get_current_user_vector():
    """Endpoint para obtener el vector del usuario más reciente que ha iniciado sesión"""
    if not logged_users:
        raise HTTPException(status_code=404, detail="No hay usuarios autenticados")
    
    # Encontrar el usuario más reciente (ordenamos por tiempo de inicio de sesión)
    # Esto es útil si hay múltiples usuarios autenticados
    sorted_users = sorted(logged_users.values(), key=lambda u: u.login_time, reverse=True)
    current_user = sorted_users[0]
    current_user_id = current_user.user_id
    
    # Actualizar la hora de última actividad
    current_time = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logged_users[current_user_id].last_active = current_time
    
    # Obtener el vector usando la función existente
    try:
        # Llamamos a la función existente para obtener el vector
        user_vector_result = await get_user_vector(current_user_id)
        
        # Almacenar el vector en la información del usuario autenticado
        logged_users[current_user_id].vector = user_vector_result.get('original_vector')
        
        return {
            'status': 'success',
            'message': 'Vector del usuario actual obtenido',
            'user_id': current_user_id,
            'username': current_user.username,
            'last_active': current_time,
            **user_vector_result  # Incluir todo el resultado del vector
        }
    except Exception as e:
        print(f"Error al obtener el vector del usuario actual: {e}")
        raise HTTPException(
            status_code=500, 
            detail="No se pudo obtener el vector del usuario"
        )


# Endpoints para grupos
@app.get("/api/groups")
async def get_groups():
    """Obtener todos los grupos disponibles"""
    if not supabase:
        # Datos de ejemplo si no hay conexión a Supabase
        return {
            "groups": [
                {"group_id": "demo-1", "group_name": "Grupo Demo 1", "group_users": ["usuario1", "usuario2"]},
                {"group_id": "demo-2", "group_name": "Grupo Demo 2", "group_users": ["usuario3", "usuario4"]}
            ]
        }
    
    try:
        # Obtener los grupos desde Supabase
        response = supabase.table('groups').select('*').execute()
        groups = response.data
        return {"groups": groups}
    except Exception as e:
        print(f"Error al obtener grupos: {e}")
        raise HTTPException(status_code=500, detail=f"Error al obtener grupos: {str(e)}")

@app.get("/api/group/{group_id}/vector")
async def get_group_vector(group_id: str):
    """Obtener el vector promedio de un grupo basado en los vectores de sus usuarios"""
    try:
        # 1. Obtener la información del grupo
        if not supabase:
            # Datos de ejemplo
            group = {"group_id": group_id, "group_name": f"Grupo {group_id}", "group_users": ["usuario1", "usuario2"]}
        else:
            group_response = supabase.table('groups').select('*').eq('group_id', group_id).execute()
            if not group_response.data:
                raise HTTPException(status_code=404, detail=f"Grupo no encontrado: {group_id}")
            group = group_response.data[0]
        
        # 2. Obtener los usuarios del grupo
        users_in_group = group.get("group_users", [])
        if not users_in_group:
            raise HTTPException(status_code=404, detail=f"No se encontraron usuarios en el grupo {group_id}")
        
        # 3. Obtener los vectores de cada usuario
        user_vectors = []
        users_info = []
        
        for username in users_in_group:
            # Buscar el usuario por su nombre de usuario
            if not supabase:
                # Usar datos de ejemplo para pruebas
                dummy_vector = [5, 3, 7, 2, 1, 4, 6, 3, 2, 5, 2, 1, 0, 3, 1, 2, 0, 1, 0, 120]
                user_vectors.append(dummy_vector)
                users_info.append({"username": username, "id": f"demo-{username}"})
            else:
                # Obtener el usuario desde Supabase
                user_response = supabase.table('users').select('*').eq('username', username).execute()
                if user_response.data:
                    user = user_response.data[0]
                    user_id = user.get('id')
                    users_info.append({"username": username, "id": user_id})
                    
                    # Obtener el vector del usuario usando la función existente
                    try:
                        # Llamar a la función existente para obtener el vector del usuario
                        user_vector_result = await get_user_vector(user_id)
                        vector = user_vector_result.get('original_vector')
                        if vector:
                            user_vectors.append(vector)
                    except Exception as e:
                        print(f"Error al obtener vector para el usuario {username}: {e}")
        
        if not user_vectors:
            raise HTTPException(status_code=404, detail=f"No se pudieron obtener vectores para los usuarios del grupo {group_id}")
        
        # 4. Calcular el vector promedio del grupo
        # Convertir a numpy para cálculos más eficientes
        vectors_array = np.array(user_vectors)
        avg_vector = vectors_array.mean(axis=0).tolist()
        
        # 5. Normalizar el vector promedio
        normalized_avg_vector = normalize_vector(avg_vector)
        
        return {
            "group_id": group_id,
            "group_name": group.get("group_name", f"Grupo {group_id}"),
            "users": users_info,
            "users_count": len(users_info),
            "vectors_count": len(user_vectors),
            "average_vector": avg_vector,
            "normalized_average_vector": normalized_avg_vector
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error al calcular el vector del grupo: {e}")
        raise HTTPException(status_code=500, detail=f"Error al procesar la solicitud: {str(e)}")


# Función para calcular la similitud del coseno entre dos vectores
def cosine_similarity(vector_a, vector_b):
    """Calcular la similitud del coseno entre dos vectores"""
    try:
        # Convertir a numpy arrays
        a = np.array(vector_a)
        b = np.array(vector_b)
        
        # Calcular la similitud del coseno
        dot_product = np.dot(a, b)
        norm_a = np.linalg.norm(a)
        norm_b = np.linalg.norm(b)
        
        if norm_a == 0 or norm_b == 0:
            return 0.0
        
        similarity = dot_product / (norm_a * norm_b)
        return float(similarity)  # Convertir a float para serialización JSON
    except Exception as e:
        print(f"Error al calcular similitud: {e}")
        return 0.0


@app.get("/api/current_user/group_affinities")
async def get_current_user_group_affinities(limit: int = Query(default=10, le=50)):
    """Obtener la afinidad del usuario actualmente logueado con todos los grupos disponibles"""
    try:
        # 1. Obtener el usuario actualmente logueado
        if not logged_users:
            raise HTTPException(status_code=404, detail="No hay usuarios autenticados")
        
        # Encontrar el usuario más reciente
        sorted_users = sorted(logged_users.values(), key=lambda u: u.login_time, reverse=True)
        current_user = sorted_users[0]
        current_user_id = current_user.user_id
        
        # 2. Obtener el vector del usuario actual
        current_user_vector_result = await get_user_vector(current_user_id)
        current_user_vector = current_user_vector_result.get('normalized_vector')
        
        if not current_user_vector:
            raise HTTPException(status_code=404, detail="No se pudo obtener el vector del usuario actual")
        
        # 3. Obtener todos los grupos disponibles
        groups_response = await get_groups()
        all_groups = groups_response.get("groups", [])
        
        if not all_groups:
            raise HTTPException(status_code=404, detail="No se encontraron grupos para comparar")
            
        # Filtrar grupos vacíos - sólo considerar grupos con al menos un usuario
        non_empty_groups = [group for group in all_groups if group.get("group_users") and len(group.get("group_users", [])) > 0]
        
        # Filtrar los grupos donde el usuario ya es miembro
        username = current_user.username
        # Considerando que el username podría ser distinto al almacenado en el grupo
        # Obtenemos posibles variantes del nombre de usuario
        user_data = await get_user_vector(current_user_id)
        possible_usernames = [
            username,
            user_data.get('username', ''),
            current_user_id  # Por si acaso el ID está almacenado directamente
        ]
        
        # Filtrar grupos donde el usuario ya es miembro
        available_groups = []
        for group in non_empty_groups:
            group_users = group.get("group_users", [])
            
            # Verificar si alguna variante del username aparece en el grupo
            is_member = False
            for potential_name in possible_usernames:
                if potential_name and potential_name in group_users:
                    is_member = True
                    break
            
            # Solo incluir el grupo si el usuario NO es miembro
            if not is_member:
                available_groups.append(group)
        
        # 4. Calcular la afinidad (similitud) con cada grupo
        groups_with_affinity = []
        
        for group in available_groups:
            group_id = group.get('group_id')
            
            try:
                # Obtener el vector del grupo
                group_vector_result = await get_group_vector(group_id)
                group_vector = group_vector_result.get('normalized_average_vector')
                
                if group_vector:
                    # Calcular similitud
                    affinity = cosine_similarity(current_user_vector, group_vector)
                    
                    # Agregar a la lista de resultados
                    groups_with_affinity.append({
                        "group_id": group_id,
                        "group_name": group.get("group_name", f"Grupo {group_id}"),
                        "users_count": group_vector_result.get("users_count", 0),
                        "affinity_score": affinity,
                        "affinity_percentage": round(affinity * 100, 1)  # Convertir a porcentaje
                    })
            except Exception as e:
                print(f"Error al calcular afinidad con el grupo {group_id}: {e}")
                # Continuamos con el siguiente grupo si hay un error
                continue
        
        # 5. Ordenar grupos por afinidad (mayor a menor)
        sorted_groups = sorted(groups_with_affinity, key=lambda g: g["affinity_score"], reverse=True)
        
        # Limitar el número de resultados
        top_groups = sorted_groups[:limit]
        
        return {
            "user_id": current_user_id,
            "username": current_user.username,
            "total_groups": len(all_groups),
            "non_empty_groups": len(non_empty_groups),
            "groups_with_affinity": len(groups_with_affinity),
            "matched_groups": len(top_groups),
            "groups": top_groups
        }
    except HTTPException as e:
        raise e
    except Exception as e:
        print(f"Error al calcular afinidades con grupos: {e}")
        raise HTTPException(status_code=500, detail=f"Error al calcular afinidades con grupos: {str(e)}")

@app.post("/api/group/join")
async def join_group(request: JoinGroupRequest):
    """Añadir un usuario a un grupo específico"""
    try:
        # 1. Verificar que el usuario existe
        if not request.user_id or not request.username:
            raise HTTPException(status_code=400, detail="Se requiere ID y nombre de usuario")
            
        # 2. Verificar que el grupo existe
        try:
            if not supabase:
                raise HTTPException(status_code=500, detail="No hay conexión con Supabase")
                
            group_response = supabase.table('groups').select('*').eq('group_id', request.group_id).execute()
            
            if not group_response.data or len(group_response.data) == 0:
                raise HTTPException(status_code=404, detail=f"No se encontró el grupo con ID {request.group_id}")
                
            group = group_response.data[0]
            
            # 3. Verificar si el usuario ya está en el grupo
            current_users = group.get('group_users', [])
            
            # Comprobar si el usuario ya está en el grupo (por nombre de usuario)
            if request.username in current_users:
                return {"message": "El usuario ya es miembro de este grupo", "status": "already_member"}
            
            # 4. Añadir el usuario al grupo (solo el nombre de usuario para mantener consistencia)
            updated_users = current_users + [request.username] if current_users else [request.username]
            
            # 5. Recalcular el vector promedio del grupo con el nuevo usuario
            try:
                # Obtener el vector del nuevo usuario
                user_vector_result = await get_user_vector(request.user_id)
                new_user_vector = user_vector_result.get('original_vector')
                
                # Obtener el vector promedio actual del grupo
                current_avg_vector = group.get('avg_vector', [])
                
                # Si no hay vector promedio o es la primera vez, usar el vector del usuario
                if not current_avg_vector or len(current_users) == 0:
                    new_avg_vector = new_user_vector
                else:
                    # Calcular el nuevo vector promedio
                    # Fórmula: ((promedio_actual * num_usuarios) + nuevo_vector) / (num_usuarios + 1)
                    num_users = len(current_users)
                    
                    # Convertir a numpy para cálculos más eficientes
                    current_avg_np = np.array(current_avg_vector)
                    new_user_np = np.array(new_user_vector)
                    
                    # Calcular el nuevo promedio
                    new_avg_np = ((current_avg_np * num_users) + new_user_np) / (num_users + 1)
                    new_avg_vector = new_avg_np.tolist()
                    
                    # Normalizar el vector promedio
                    new_avg_vector_normalized = normalize_vector(new_avg_vector)
                
                # 6. Actualizar el grupo en Supabase con los usuarios y el nuevo vector promedio normalizado
                update_data = {
                    "group_users": updated_users,
                    "avg_vector": new_avg_vector_normalized,
                    "group_size": len(updated_users)
                }
                
                update_response = supabase.table('groups').update(update_data).eq('group_id', request.group_id).execute()
                
                if not update_response.data:
                    raise HTTPException(status_code=500, detail="Error al actualizar el grupo")
                
                return {
                    "message": f"Usuario {request.username} añadido al grupo exitosamente",
                    "status": "success",
                    "group": update_response.data[0],
                    "vector_updated": True,
                    "updated_group_users": updated_users
                }
                
            except Exception as e:
                # Si hay un error al recalcular el vector, al menos actualizamos los usuarios
                print(f"Error al recalcular el vector del grupo: {e}")
                
                # Actualizar solo los usuarios
                update_response = supabase.table('groups').update({"group_users": updated_users}).eq('group_id', request.group_id).execute()
                
                if not update_response.data:
                    raise HTTPException(status_code=500, detail="Error al actualizar el grupo")
                
                return {
                    "message": f"Usuario {request.username} añadido al grupo exitosamente (sin actualizar vector)",
                    "status": "success",
                    "group": update_response.data[0],
                    "vector_updated": False,
                    "updated_group_users": updated_users
                }
            
        except Exception as e:
            if isinstance(e, HTTPException):
                raise e
            raise HTTPException(status_code=500, detail=f"Error al unirse al grupo: {str(e)}")
            
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error en el servidor: {str(e)}")


        current_user = logged_users[current_user_id]
        
        # 2. Obtener todos los grupos desde Supabase
        if not supabase:
            raise HTTPException(status_code=500, detail="Error en la conexión con Supabase")
            
        groups_response = supabase.table('groups').select('*').execute()
        all_groups = groups_response.data if groups_response.data else []
        
        # 3. Obtener posibles variantes del nombre de usuario
        username = current_user.username
        user_data = await get_user_vector(current_user_id)
        possible_usernames = [
            username,
            user_data.get('username', ''),
            current_user_id
        ]
        
        # 4. Filtrar grupos donde el usuario ya es miembro
        joined_groups = []
        for group in all_groups:
            group_users = group.get("group_users", [])
            
            # Verificar si alguna variante del username aparece en el grupo
            is_member = False
            for potential_name in possible_usernames:
                if potential_name and potential_name in group_users:
                    is_member = True
                    break
            
            # Solo incluir el grupo si el usuario ES miembro
            if is_member:
                joined_groups.append(group)
        
        # 5. Devolver los grupos a los que pertenece
        return {
            "joined_groups": joined_groups,
            "count": len(joined_groups)
        }
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error al obtener grupos unidos: {str(e)}")


@app.get("/api/current_user/joined_groups/{current_user_id}")
async def get_current_user_joined_groups(current_user_id: str):
    """Obtener los grupos a los que pertenece el usuario."""
    try:
        # 1. Verificar que existe el usuario
        if current_user_id not in logged_users:
            raise HTTPException(status_code=401, detail="Usuario no autenticado")
            
        current_user = logged_users[current_user_id]
        
        # 2. Obtener todos los grupos desde Supabase
        if not supabase:
            raise HTTPException(status_code=500, detail="Error en la conexión con Supabase")
            
        groups_response = supabase.table('groups').select('*').execute()
        all_groups = groups_response.data if groups_response.data else []
        
        # 3. Obtener posibles variantes del nombre de usuario
        username = current_user.username
        user_data = await get_user_vector(current_user_id)
        possible_usernames = [
            username,
            user_data.get('username', ''),
            current_user_id
        ]
        
        # 4. Filtrar grupos donde el usuario ya es miembro
        joined_groups = []
        for group in all_groups:
            group_users = group.get("group_users", [])
            
            # Verificar si alguna variante del username aparece en el grupo
            is_member = False
            for potential_name in possible_usernames:
                if potential_name and potential_name in group_users:
                    is_member = True
                    break
            
            # Solo incluir el grupo si el usuario ES miembro
            if is_member:
                joined_groups.append(group)
        
        # 5. Devolver los grupos a los que pertenece
        return {
            "joined_groups": joined_groups,
            "count": len(joined_groups)
        }
        
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=f"Error al obtener grupos unidos: {str(e)}")


if __name__ == '__main__':
    # Ejecutar el servidor con uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=5000, reload=True)
