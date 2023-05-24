import IconDeviceFloppy from "icons/device-floppy.tsx"
import Button from "@/islands/Button.tsx"

export default function Save() {
    return (
        <Button type="submit" class="px-3 py-2 bg-white rounded border(gray-400 1) hover:bg-gray-200 flex gap-2">
            <IconDeviceFloppy class="w-6 h-6" />Save
        </Button>
    )
}
