import React from 'react';
import "../../styles/SkeletonLoaders.css";

export default function GroupSkeleton({ type = "recommended" }) {
  return (
    <div className={`Group${type === "recommended" ? "Recommended" : "Joined"}Skeleton`}>
      <div className="skeletonHeader">
        <div className="skeletonMemberCount"></div>
        {type === "joined" && <div className="skeletonIcon"></div>}
      </div>
      <div className="skeletonTitle"></div>
      <div className="skeletonFooter">
        {type === "recommended" ? (
          <div className="skeletonAffinityLabel"></div>
        ) : (
          <div className="skeletonCreator"></div>
        )}
      </div>
    </div>
  );
}
