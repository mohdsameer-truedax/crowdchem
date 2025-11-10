import { useEffect } from 'react';
import Application from './Application'
import UseStudies from './UseStudies'

const UseCases = () => {
   useEffect(() => {
      document.title = "Use Cases - CrowdChem";
      const meta = document.querySelector("meta[name='description']");
      if (meta) meta.setAttribute("content", "Explore real-world use cases of CrowdChem’s innovation platform in action.");
    }, []);
  return (
    <div>
      <UseStudies/>
      <Application/>
    </div>
  )
}

export default UseCases