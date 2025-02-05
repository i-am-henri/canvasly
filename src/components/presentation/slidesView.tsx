// view for the slides
'use client';

import { Button } from '../dashboard/button';
import { changeSlide, createSlide } from './current-slide';
import { useSlidesStore } from './slides';

export default function SlidesView() {
  const { slides } = useSlidesStore();
  return (
    <div className="flex flex-col gap-2 lg:mr-2">
      <Button size={'sm'} onClick={() => createSlide()} variant={'outline'}>
        Add Slide
      </Button>
      {slides.map((slide, index) => (
        <button
          type="button"
          key={index.toString()}
          onClick={() => changeSlide(index)}
          className="flex gap-2 items-center rounded-md border border-border p-2"
        >
          Slide {index + 1}
        </button>
      ))}
    </div>
  );
}
