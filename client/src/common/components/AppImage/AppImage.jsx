import { useState, useEffect } from 'react';


export default function AppImage(props) {

  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchImage = async () => {
      try {

        const response = await fetch(`http://localhost:8080${props.src}`);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setImageSrc(url);

      } catch (error) {
        console.error('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    if (props.src) { fetchImage(); }

  }, [props.src]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <img className={props.className} src={imageSrc} alt={props.alt} />
    </>
  )

}
