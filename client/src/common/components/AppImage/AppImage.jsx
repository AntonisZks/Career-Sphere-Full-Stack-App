import { useState, useEffect } from 'react';


export default function AppImage(props) {

  const [imageSrc, setImageSrc] = useState('');

  useEffect(() => {

    const fetchImage = async () => {
      try {
        const response = await fetch(`http://localhost:8080${props.src}`);
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        } 
        else {
          console.error('Image Not Found');
        }
      } 
      catch (err) {
        console.error('Error fetching image:', err);
      }
    };

    if (props.src !== null) {
      fetchImage();
    }

  }, [props.src]);

  return (
    <>
      <img className={props.className} src={imageSrc} alt={props.alt} />
    </>
  )

}
