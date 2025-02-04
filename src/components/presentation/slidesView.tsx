// view for the slides
'use client';

import { Button } from '../dashboard/button';

export default function SlidesView() {
  return (
    <div className="flex flex-col gap-2 mr-2">
      <Button size={'sm'} variant={'outline'}>
        Add Slide
      </Button>
    </div>
  );
}
