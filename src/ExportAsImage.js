import * as htmlToImage from "html-to-image";

const ExportAsImage = (ref, setIsSavingImage) => {
    if (ref){
        htmlToImage.toPng(ref)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = Date.now().toString();
                link.click();
                setIsSavingImage(false)
            })
            .catch(function (error) {
                console.error('Oops, something went wrong!', error);
                setIsSavingImage(false)
            });
    }
}

export { ExportAsImage };