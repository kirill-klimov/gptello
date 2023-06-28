import { backgrounds } from "../presets/background";
import CheckmarkSvg from '../assets/checkmark.svg';

type Item = {
    type: BackgroundType, 
    value: string
}

export enum BackgroundType {
    Color = "Color",
    Image = "Image"
}

type Props = {
    selected: Item
    onChange: (item: Item) => void
    className?: string
}

export default function BackgroundSelector(props: Props) {
    return (
        <div className={`select-none ${props.className}`}>
            <div className="flex flex-wrap gap-1 mb-2">
                {backgrounds.pictures.map(item =>
                    <div key={item} className="relative cursor-pointer">
                        <div
                        onClick={_ => props.onChange({
                            type: BackgroundType.Image,
                            value: item
                        })} 
                        className="h-12 w-16 rounded bg-cover bg-no-repeat bg-center"
                        style={{ backgroundImage: item }}>
                        </div>
                        {
                            props.selected.value !== item ? <></> :
                            <div className="canvas bg-gray-500/50 flex justify-center items-center rounded">
                                <CheckmarkSvg className="h-4 w-4 stroke-white scale-y-90" />
                            </div>
                        }
                    </div>
                )}
            </div>
            <div className="flex flex-wrap gap-1">
                {backgrounds.colors.map(item =>
                    <div key={item} className="relative cursor-pointer">
                        <div
                        onClick={_ => props.onChange({
                            type: BackgroundType.Color,
                            value: item
                        })} 
                        className="h-9 w-12 rounded"
                        style={{ backgroundColor: item }}>
                        </div>
                        {
                            props.selected.value !== item ? <></> :
                            <div className="canvas bg-gray-500/50 flex justify-center items-center rounded">
                                <CheckmarkSvg className="h-4 w-4 stroke-white scale-y-90" />
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}