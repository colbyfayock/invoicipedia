"use client";

import { SyntheticEvent } from 'react';
import { useFormStatus } from 'react-dom';
import { LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/Button';

const SubmitButton = () => {
  const { pending } = useFormStatus();

  function handleOnClick(event: SyntheticEvent) {
    // Makes more sense to handle next to the form logic!
    // if ( pending ) {
    //   event.preventDefault();
    // }
  }

  return (
    <Button className="relative" onClick={handleOnClick}>
      <span className={pending ? 'text-transparent' : ''}>Submit</span>
      {pending && (
        <span className="absolute flex items-center justify-center w-full h-full text-gray-400">
          <LoaderCircle className="animate-spin" />
        </span>
      )}
    </Button>
  );
}

export default SubmitButton;