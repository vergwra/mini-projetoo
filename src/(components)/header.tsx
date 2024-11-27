import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
import { LogoName } from "./logo-name";
import Link from "next/link";

export function Header({ id }: { id: number }){
    return(
        <div className="bg-blue-600 flex px-20 gap-8 items-center">
            <Link href={`/alunos?id=${id}`}>
                <LogoName/> 
            </Link>
            <NavigationMenu >
                <NavigationMenuList>
                    <NavigationMenuItem className="">
                        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-white focus:text-white hover:text-white">Biblioteca</NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[400px] gap-2 px-8 p-2 flex flex-col divide-y divide-muted-foreground">
                            <NavigationMenuLink className="w-full bg-blue-50 p-2">
                                <Link href={`/livros?id=${id}`}>
                                    <ul className="grid w-[400px] gap-3 p-0 md:w-[500px] md:grid-cols-2 lg:w-[500px]">
                                        <p className="truncate line-clamp-1 w-[200px]">Alugar livro</p>
                                    </ul>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent text-white focus:text-white hover:text-white">Matrícula</NavigationMenuTrigger>
                        <NavigationMenuContent className="min-w-[400px] gap-2 px-8 p-2 flex flex-col divide-y divide-muted-foreground">
                            <NavigationMenuLink className=" w-64 bg-blue-50 p-2">
                                <Link href={`/diciplina?id=${id}`} >
                                    <ul className="grid w-[400px] gap-3 p-0 md:w-[500px] md:grid-cols-2 lg:w-[500px]">
                                        <p className="truncate line-clamp-1 w-[200px]">Matricular Diciplinas</p>
                                    </ul>
                                </Link>
                            </NavigationMenuLink>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <div className="w-full ml-9">
                            <Link className="text-white text-sm" href={'/login'}>Logout</Link>
                        </div>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}