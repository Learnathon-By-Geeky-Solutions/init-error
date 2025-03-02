import { Card, CardContent } from "../ui/card"
import { Input } from "../ui/input"

const EditProfile = () => {
  return (
    <div>
      <Card className="p-6 max-w-3xl">
          <CardContent className="mb-4">
            <label className="font-medium">Email</label>
            <Input type="email" value="sokarama79@gmail.com" className="mt-1" />
            <label className="font-medium">First Name</label>
            <Input type="text" value="Ajor" className="mt-1" />
            <label className="font-medium">Last Name</label>
            <Input type="text" value="Saha" className="mt-1" />
          </CardContent>
          
        </Card>
    </div>
  )
}

export default EditProfile
