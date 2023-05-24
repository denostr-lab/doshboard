export function MiddleText({ message }: { message: string }) {
  return (
    <div class="flex justify-center mt-10">
      <span class="block text-center text-stone-800 font-sartoshi text-4xl">
        {message}
      </span>
    </div>
  );
}
