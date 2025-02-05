'use client';

import { Button } from '../dashboard/button';
import { useSelectionStore } from './select';

// components for the different selection types

export function SingleSelection() {
  const { singleObject, setSingleObject, setSelection } = useSelectionStore();

  if (!singleObject) {
    setSingleObject(null);
    setSelection('none');
    return null;
  }

  // settings for a single object
  return (
    <div>
      <h1>Single Selection</h1>
      <p>{singleObject.type}</p>
      <p>{singleObject.scaleX}</p>
    </div>
  );
}

export function MultipleSelection() {
  return (
    <div>
      <Button
        variant={'destructive'}
        onClick={() => {
          console.log('Mass delete');
        }}
      >
        Delete All
      </Button>
    </div>
  );
}

export function NoSelection() {
  return (
    <div>
      <h1>Edit canvas</h1>
    </div>
  );
}
