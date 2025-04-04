
import { User, Mail, Phone, MapPin, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserProfileCardProps {
  name: string;
  role: string;
  location: string;
  phone: string;
  email: string;
  avatarUrl?: string;
}

const UserProfileCard = ({ 
  name, 
  role, 
  location, 
  phone, 
  email, 
  avatarUrl 
}: UserProfileCardProps) => {
  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <Avatar className="h-24 w-24 border-2 border-agri-primary">
            <AvatarImage src={avatarUrl} alt={name} />
            <AvatarFallback className="bg-agri-secondary text-white text-2xl">
              {name.substring(0, 1)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-2xl font-bold">{name}</h3>
                <p className="text-muted-foreground">{role}</p>
              </div>

              <Button 
                size="sm" 
                variant="outline" 
                className="mt-3 md:mt-0 inline-flex items-center gap-1 border-agri-primary text-agri-primary hover:bg-agri-primary hover:text-white"
              >
                <Edit size={16} />
                <span>Edit Profile</span>
              </Button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={16} className="text-agri-primary" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-agri-primary" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-agri-primary" />
                <span>{email}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
