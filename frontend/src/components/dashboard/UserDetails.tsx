import { Card, CardContent, CardHeader } from "../ui/card"
import { Input } from "../ui/input"

const UserDetails = () => {
  return (
    <div>
      <Card className="p-6 max-w-3xl">
          <CardHeader className="mb-4">
            <label className="font-medium">Username</label>
            <Input type="text" value="ajor-saha" className="mt-1" />
            <p className="text-sm">Your Dribbble URL: https://project-sphere.com/ajor-saha</p>
          </CardHeader>
          <CardContent className="mb-4">
            <label className="font-medium">Email</label>
            <Input type="email" value="sokarama79@gmail.com" className="mt-1" />
          </CardContent>
          
        </Card>
    </div>
  )
}

export default UserDetails
