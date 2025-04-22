import React, { useState, useEffect } from "react";

const VideoPlayer = ({ videoId: any }) => {
  const [videoUrl, setVideoUrl] = useState("");

  useEffect(() => {
    // Récupérer l'URL de la vidéo depuis Livepeer en utilisant l'ID
    const fetchVideoUrl = async () => {
      const res = await fetch(`https://livepeer.com/api/v1/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      });
      const data = await res.json();
      setVideoUrl(data?.playbackUrl);
    };
    fetchVideoUrl();
  }, [videoId]);

  return (
    <div>
      {videoUrl ? (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Chargement de la vidéo...</p>
      )}
    </div>
  );
};

export default VideoPlayer;
