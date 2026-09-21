import * as htmlToImage from "html-to-image";

const ExportAsImage = async (ref, setIsSavingImage) => {
    if (!ref) {
        setIsSavingImage(false);
        return;
    }

    let clone = null;
    try {
        clone = ref.cloneNode(true);
        clone.classList.add('export-mode-6x4');

        clone.style.position = 'fixed';
        clone.style.top = '0';
        clone.style.left = '0';
        clone.style.width = '984px';
        clone.style.minWidth = '984px';
        clone.style.maxWidth = '984px';
        clone.style.boxSizing = 'border-box';
        clone.style.padding = '12px';
        clone.style.zIndex = '-9999';
        clone.style.pointerEvents = 'none';
        clone.style.opacity = '1';
        clone.style.visibility = 'visible';

        const grid = clone.querySelector('.music-grid') || clone.querySelector('[data-grid="music-grid"]') || clone.firstElementChild;
        if (grid) {
            grid.style.display = 'grid';
            grid.style.gridTemplateColumns = 'repeat(6, 150px)';
            grid.style.gap = '12px';
            grid.style.width = '960px';
            grid.style.minWidth = '960px';
            grid.style.maxWidth = '960px';
        }

        document.body.appendChild(clone);

        void clone.offsetHeight;

        const width = 984;
        const height = clone.offsetHeight || clone.scrollHeight || 836;

        const dataUrl = await htmlToImage.toPng(clone, {
            width,
            height,
            style: {
                position: 'static',
                margin: '0',
                left: 'auto',
                top: 'auto',
            },
        });

        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `${Date.now()}.png`;
        link.click();
    } catch (error) {
        console.error('Oops, something went wrong!', error);
    } finally {
        if (clone && clone.parentNode) {
            clone.parentNode.removeChild(clone);
        }
        setIsSavingImage(false);
    }
};

export { ExportAsImage };