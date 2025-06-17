import * as htmlToImage from "html-to-image";

const ExportAsImage = (ref) => {
    if (ref){
        let options = {
            style: {
                backgroundColor: "black",
            }
        }

        htmlToImage.toPng(ref, options)
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.href = dataUrl;
                link.download = Date.now().toString();
                link.click();
            })
            .catch(function (error) {
                console.error('Oops, something went wrong!', error);
            });
    }
}

export { ExportAsImage };