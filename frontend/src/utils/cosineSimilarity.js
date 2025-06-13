/**
 * Calcula la similitud coseno entre dos vectores
 * @param {Array} a - Primer vector
 * @param {Array} b - Segundo vector
 * @returns {Number} - Similitud coseno (valor entre -1 y 1)
 */
export function cosineSimilarity(a, b) {
  // Verificar que los vectores tengan la misma dimensión
  if (a.length !== b.length) {
    throw new Error('Los vectores deben tener la misma dimensión');
  }
  
  // Producto punto
  let dotProduct = 0;
  // Magnitud de los vectores
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }
  
  // Evitar división por cero
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }
  
  // Calcular similitud coseno
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}
