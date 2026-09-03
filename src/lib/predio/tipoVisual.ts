import FutbolIcon from '../../components/predio-page/icons/FutbolIcon';
import PadelIcon from '../../components/predio-page/icons/PadelIcon';

function normalizar(texto: string): string {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

// Cada tipo tiene su ícono y un color de fondo propio para diferenciarse a simple vista
const VISUAL_POR_TIPO: Record<string, { Icon: typeof FutbolIcon; bg: string; color: string }> = {
    futbol: { Icon: FutbolIcon, bg: 'bg-emerald-50', color: 'text-emerald-600' },
    padel: { Icon: PadelIcon, bg: 'bg-sky-50', color: 'text-sky-600' },
};

const VISUAL_POR_DEFECTO = { Icon: FutbolIcon, bg: 'bg-[#243054]/5', color: 'text-[#243054]/40' };

// Busca coincidencia parcial: "Fútbol 5" o "Futbol 7" matchean con "futbol"
export function getVisualPorTipo(tipo: string) {
    const tipoNormalizado = normalizar(tipo);
    const clave = Object.keys(VISUAL_POR_TIPO).find((key) =>
        tipoNormalizado.includes(key),
    );

    return clave ? VISUAL_POR_TIPO[clave] : VISUAL_POR_DEFECTO;
}