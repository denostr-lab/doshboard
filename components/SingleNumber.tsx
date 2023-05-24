interface SingleNumberProps {
  label: string;
  number: number;
}

export function SingleNumber({ label, number }: SingleNumberProps) {
  return (
    <div class="p-5 border-1 border-orange-200 bg-white">
      <span class="block text-center pb-1 text-lg text-orange-500 font-bold tracking-tighter">
        {label}
      </span>
      <div class="text-center">
        <span class="text-4xl text-stone-700 tracking-[-0.075em]">
          {number}
        </span>
      </div>
    </div>
  );
}
