# [doc88.com](https://doc88.com) Downloader

This is a downloader of documents from [doc88.com](https://doc88.com). It saves pages of a given document as a PDF.
The code was tested in Google Chrome, Microsoft Edge and Mozilla Firefox.
It depends on the following libraries:
 1. js-power-module-injector (https://gist.github.com/esedic/c8f4ab1685be3692a135b832f5df96f1) - To import external scripts in Browser Javascript console.
 2. jsPDF (https://github.com/parallax/jsPDF) - To generate the PDF on the Client Side.

## Instructions

 1. Navigate to the desired document in your browser on doc88.com.
 1. Open Developer's Tools for your browser.
 1. Go to the Console Tab.
 1. Copy the code from (/downloader.js) and paste into console.
 1. Adjust the parameters if required.
 1. Press "Enter" key and monitor the progress.
 1. At the end, a PDF file will be downloaded.
 1. Make sure all desired pages were downloaded correctly.

If you further want to OCR the PDF (recognize the text in it and make it searchable), install the OCRmyPDF package:

```shell script
sudo apt-get install ocrmypdf
```

Then — in directory in which the PDF is — issue the following command which will perform text recognition in the `output.pdf` PDF and make it searchable:

```shell script
ocrmypdf output.pdf output.pdf
```
