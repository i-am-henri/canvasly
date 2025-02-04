// view for the slides
'use client';

import { Button } from '../dashboard/button';
import { addSlide, useSlidesStore } from './slides';

export default function SlidesView() {
  const { slide } = useSlidesStore();
  return (
    <div>
      <Button onClick={() => addSlide('{}')}>Add Slide</Button>
      {slide.map((slide, index) => (
        <div key={index}>{slide}</div>
      ))}
    </div>
  );
}
