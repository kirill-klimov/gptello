export default function Spinner(props: { className?: string }) {
    return (
        <div className={`h-5 w-5 border-2 border-white rounded-full border-l-transparent animate-spin ${props.className}`}></div>
    );
}