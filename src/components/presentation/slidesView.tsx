// view for the slides
'use client';

import { Button } from '../dashboard/button';
import { addSlide, useSlidesStore } from './slides';

export default function SlidesView() {
  const { preview, setCurrentSlide } = useSlidesStore();
  return (
    <div className="flex flex-col gap-2 mr-2">
      <Button
        size={'sm'}
        variant={'outline'}
        onClick={() => addSlide('{"version":"6.5.4","objects":[]}')}
      >
        Add Slide
      </Button>
      {preview.map((preview, index) => (
        <div
          className="w-full cursor-pointer p-2 border border-border rounded-md"
          key={index}
          onClick={() => setCurrentSlide(index)}
          onKeyDown={() => setCurrentSlide(index)}
          dangerouslySetInnerHTML={{ __html: preview }}
        />
      ))}
    </div>
  );
}
