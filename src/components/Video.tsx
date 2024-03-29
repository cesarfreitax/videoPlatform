import { CaretRight, DiscordLogo, FileArrowDown, Lightning } from "phosphor-react";
import { DefaultUi, Player, Youtube } from "@vime/react";

import '@vime/core/themes/default.css'
import { useGetLessonBySlugQuery } from "../graphql/generated";

interface VideoProps {
    lessonSlug: string;
}

export function Video(props: VideoProps) {
    const { data } = useGetLessonBySlugQuery({
        variables: {
            slug: props.lessonSlug,
        }
    })


    if (!data || !data.lesson) {
        return (
            <div className="flex-1">
                <p>Carregando...</p>
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="bg-black flex justify-center">
                <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
                    <Player>
                        <Youtube videoId={data.lesson.videoId} />
                        <DefaultUi />
                    </Player>
                </div>
            </div>

            <div className="p-8 max-w[1100] mx-auto">
                <div className="flex flex-col gap-16 lg:flex-row lg:items-start">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold">
                            {data.lesson.title}
                        </h1>

                        <p className="mt-4 text-gray-200" leading-relaxed>
                            {data.lesson.description}
                        </p>

                        {data.lesson.teacher && (
                            <div className="flex items-center gap-4 mt-6">
                                <img className="h-16 w-16 rounded-full border-2 border-blue-500"
                                    src={data.lesson.teacher.avatarURL}
                                    alt="" />

                                <div className="leading-relaxed">
                                    <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                                    <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-4">
                        <a href="#" className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
                            <DiscordLogo size={24} />
                            Comunidade de Discord
                        </a>

                        <a href="#" className="p-4 text-sm border border-blue-500 text-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors ">
                            <Lightning size={24} />
                            Acesse o desafio
                        </a>
                    </div>
                </div>

                <div className="flex  flex-col gap-8 mt-20 lg:grid lg:grid-cols-2">
                    <a href="" className="bg-gray-700 rounded overflow-hidden flex flex-col justify-center mx-auto items-center lg:flex-row lg:items-stretch gap-6 hover: bg-gray-600 transition-colors lg:h-[140px]">
                        <div className="bg-green-700 w-full justify-center h-full p-6 flex items-center lg:w-20 lg:p-0">
                            <FileArrowDown size={40} />
                        </div>

                        <div className="leading-relaxed flex flex-col justify-center items-center lg:items-start">
                            <strong className="text-2xl">Material complementar</strong>
                            <p className="text-sm text-gray-200 mt-2 text-center pr-2 pl-2 lg:pl-0">
                                Acesse o material complementar para acelerar o seu desenvolvimento
                            </p>
                        </div>

                        <div className="h-full pb-3 flex items-center lg:pb-0 lg:pr-4">
                            <CaretRight size={24} />
                        </div>
                    </a>

                    <a href="" className="bg-gray-700 rounded overflow-hidden flex flex-col justify-center mx-auto items-center lg:flex-row lg:items-stretch gap-6 hover: bg-gray-600 transition-colors lg:h-[140px]">
                        <div className="bg-green-700 w-full justify-center h-full p-6 flex items-center lg:w-20 lg:p-0">
                            <FileArrowDown size={40} />
                        </div>

                        <div className="leading-relaxed flex flex-col justify-center items-center lg:items-start">
                            <strong className="text-2xl">Wallpapers exclusivos</strong>
                            <p className="text-sm text-gray-200 mt-2 text-center pr-2 pl-2 lg:pl-0">
                                Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
                            </p>
                        </div>

                        <div className="h-full pb-3 flex items-center lg:pb-0 lg:pr-4">
                            <CaretRight size={24} />
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}