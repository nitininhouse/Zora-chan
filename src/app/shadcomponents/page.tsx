import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

// Example custom component
function MyCustomComponent() {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-2">Custom Component</h3>
      <p className="text-sm text-gray-600 mb-3">
        This is a custom component inside the drawer.
      </p>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Enter something..." 
          className="flex-1 px-3 py-2 border rounded"
        />
        <Button size="sm">Action</Button>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Drawer>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        
        {/* Your custom component goes here */}
        <div className="px-4 pb-4">
          <MyCustomComponent />
        </div>
        
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}