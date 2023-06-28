import { useEffect, useRef, useState } from "react";

type Props = {
    className?: string
    text: string
    onSubmit?: (value: string) => void
    onChange?: (value: string) => void
    onBlur?: (value: string) => void
    onFocus?: () => void 
    divRef: React.RefObject<HTMLDivElement>
    spellCheck?: boolean
    autoFocus?: boolean
}

export default function EditableDiv(props: Props) {
    const divRef = useRef<HTMLDivElement>(null);
    const [text, setText] = useState<string>(props.text);
    useEffect(() => {
        if (props.autoFocus && props.autoFocus !== undefined && props.autoFocus !== null) {
            setTimeout(() => {
                if (!props.divRef.current) return;
                props.onChange && props.onChange(props.text);
                const range = new Range();
                const selection = window.getSelection();
                range.setStart(props.divRef.current, 0);            
                if (props.divRef.current.textContent?.length) {
                    range.setEnd(props.divRef.current, 1);
                } else {
                    range.setEnd(props.divRef.current, 0);
                }
                selection?.removeAllRanges();
                selection?.addRange(range);
                props.divRef.current.focus();
            }, 60);
        }
    }, []);
    function handleChange(e: React.FormEvent<HTMLDivElement>) {
        const value = (e.target as HTMLDivElement).textContent || '';
        setText(value);
        props.onChange && props.onChange(value);
        const range = new Range();
        const selection = window.getSelection();
        range.setStart(e.target as Node, 0);
        if (props.divRef.current?.textContent?.length) {
            range.setEnd(e.target as Node, 1);
        } else {
            range.setEnd(e.target as Node, 0);
        }
        selection?.removeAllRanges();
        selection?.addRange(range);
        selection?.collapseToEnd();
        (e.target as HTMLDivElement).focus();
    }
    function handleSubmit(e: React.KeyboardEvent<HTMLDivElement>) {
        if (e.key === 'Enter') {
            e.preventDefault();
            props.onSubmit && props.onSubmit(text);
        }
    }
    function handleBlur() {
        props.onBlur && props.onBlur(text);
    }

    return (
        <div 
        suppressContentEditableWarning={true}
        contentEditable={true}
        spellCheck={props.spellCheck}
        onFocus={_ => {props.onFocus && props.onFocus()}}
        onBlur={handleBlur}
        id="ce-3"
        onPaste={async (e) => {
            e.preventDefault();
            const text = e.clipboardData.getData('text/plain');
            const div = document.getElementById('ce-3');
            if (div) div.textContent += text;
        }}
        ref={props.divRef}
        onInput={handleChange}
        onKeyDown={handleSubmit}
        className={props.className}>{text}</div>
    );
}