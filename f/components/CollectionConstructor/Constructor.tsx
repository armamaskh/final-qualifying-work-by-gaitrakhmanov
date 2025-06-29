"use client"
import useConstructor from '../../hooks/useConstructor';
import { ConstructorElement } from './ConstructorElement';

function Constructor({section_id}: {section_id: number}) {
  const { divisions } = useConstructor();

  return (
    <div>
      {(divisions || [])
          .filter(division => division.section_id == section_id )
          .map((d) => (
            <ConstructorElement key={d.id} division={d} /> ))}
    </div> );
}

export default Constructor
