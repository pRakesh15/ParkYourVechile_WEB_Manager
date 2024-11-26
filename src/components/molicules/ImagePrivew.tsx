import { clear } from "console";
import { BaseComponent } from "../../../../web/src/libs/utils";
import { IconTrash } from "@tabler/icons-react";
import Image from "next/image";


export interface ImageUploaderProps extends BaseComponent {
    srcs?: FileList
    clearImage: () => void
}

export const ImagePreview = ({
    srcs, clearImage, children
}: ImageUploaderProps) => {
    if (srcs && srcs?.length > 0) {
        return (
            <div className="grid grid-cols-2 relative">
                <button
                    onClick={() => clearImage()}
                    className="absolute z-10 p-2 text-white bg-red-800 flex gap-2 items-center"
                >
                    <IconTrash />Clear all
                </button>
                {
                    Array.from(srcs)?.map((src, index) => (
                      
                        <Image
                            key={index}
                            className="object-cover h-full aspect-square"
                            alt="garage Image"
                            width={300}
                            height={300}
                            src={URL.createObjectURL(src)}
                        />
                    
                    ))
                }
            </div>
        )
    }

    return (
        <div className="flex items-center justify-center w-full h-full max-h-36">
            {
                children
            }
        </div>
    )
}