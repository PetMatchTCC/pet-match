import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, PawPrint } from "lucide-react";

interface PetListItemProps {
  name: string;
  age: number;
  petId: string;
  me: boolean;
}

export const PetListItem: React.FC<PetListItemProps> = ({ name, age, petId, me }) => {
  return (
    <Card className="w-full bg-white border border-orange-100 hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center">
          <span className="text-orange-500 mr-3">
            <PawPrint size={18} />
          </span>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">
              Idade: <span className="font-medium">{age} anos</span>
            </p>
          </div>
        </div>
      </CardContent>
      {me &&
          (
      <CardFooter className="flex justify-end gap-2 p-4">

        <Button
          asChild
          className="bg-orange-500 hover:bg-orange-600 text-white"
        >
          <a href={`/edit-pet/${petId}`}>
            Editar
          </a>
        </Button>
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Excluir
        </Button>
      </CardFooter>
          )}
    </Card>
  );
};