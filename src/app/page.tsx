"use client";

import { useEffect, useState } from 'react';

interface MediaItem {
  id: number;
  title: string;
  author?: string;
  publishingYear?: number;
}

const HomePage = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: MediaItem[] = await response.json();
        setMedia(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    

    fetchData();
  }, []);

  const handleClick = (id: number) => {  // Explicitly defining id as number
    const item = media.find((m) => m.id === id);
    setSelectedMedia(item || null); // Ensure to handle case where item might not be found
  };

  return (
    <div className="container">
      <h1>Media List</h1>
      <ul className="list-group mb-4">
        {media.map((item) => (
          <li key={item.id} onClick={() => handleClick(item.id)} className="list-group-item list-group-item-action">
            {item.title}
          </li>
        ))}
      </ul>
      {selectedMedia && (
        <div className="alert alert-info">
          <h2>{selectedMedia.title}</h2>
          <p><strong>Author:</strong> {selectedMedia.author}</p>
          <p><strong>Publication Year:</strong> {selectedMedia.publishingYear}</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
