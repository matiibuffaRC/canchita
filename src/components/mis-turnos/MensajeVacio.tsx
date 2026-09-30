export function MensajeVacio({
    titulo,
    texto,
}: {
    titulo: string;
    texto: string;
}) {
    return (
        <div className="border-l-4 border-[#243054] bg-white px-5 py-5">
            <h3 className="font-extrabold">{titulo}</h3>
            <p className="mt-1 text-sm leading-6 text-[#243054]/60">{texto}</p>
        </div>
    );
}
