import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="">
      <Input />
      <Button disabled>Default</Button>
      <Button variant={"primary"} size="xs" disabled>
        primary
      </Button>
      <Button variant={"warning"}>warning</Button>
      <Button variant={"link"}>link</Button>
      <Button variant="destructive">destructive</Button>
      <Button variant="ghost">ghost</Button>
      <Button variant="outline">outline</Button>
      <Button variant="secondary">secondary</Button>
      <Button variant="muted">muted</Button>
      <Button variant="teritrary">teritrary</Button>
    </div>
  );
}
