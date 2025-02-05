// view for the slides
'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Button } from '../dashboard/button';
import {
  changeSlide,
  createSlide,
  useCurrentSlideStore,
} from './current-slide';
import { usePreviewStore } from './preview';

export default function SlidesView() {
  const { previews } = usePreviewStore();
  const { currentSlide } = useCurrentSlideStore();
  return (
    <div className="flex flex-col gap-2 lg:mr-2">
      <Button size={'sm'} onClick={() => createSlide()} variant={'outline'}>
        Add Slide
      </Button>
      {previews.map((slide, index) => (
        <Image
          width={190}
          alt="Image"
          onClick={() => changeSlide(index)}
          className={cn(
            'rounded-md border border-border p-2',
            index === currentSlide ? 'ring-2 ring-border' : ''
          )}
          height={100}
          key={index}
          src={slide.svg}
        />
      ))}
    </div>
  );
}
