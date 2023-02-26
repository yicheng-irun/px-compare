import { BrowserWindow, ipcMain, screen } from 'electron';
import { getSuitableSize } from './get-suitable-size';

export function handleMessage(param: {
  mainWindow: BrowserWindow;
  compareWindow: BrowserWindow;
}) {
  const propertyInfo = {
    imageNaturalSize: {
      width: 0,
      height: 0
    },
    compareWindow: {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  };

  function syncPropInfoToMainWindow() {
    param.mainWindow.webContents.send('syncPropInfo', propertyInfo);
  }

  function setCompareWindowPosition(x: number, y: number) {
    propertyInfo.compareWindow.x = x;
    propertyInfo.compareWindow.y = y;
    param.compareWindow.setPosition(x, y, true);
    syncPropInfoToMainWindow();
  }
  function setCompareWindowSize(width: number, height: number) {
    propertyInfo.compareWindow.width = width;
    propertyInfo.compareWindow.height = height;
    param.compareWindow.setSize(width, height, true);
    syncPropInfoToMainWindow();
  }

  ipcMain.on('changeOpacity', (v, value) => {
    param.compareWindow.webContents.send('setCompareOpacity', value);
  });

  ipcMain.on('changePosition', (v, subX: number, subY: number) => {
    const [x, y] = param.mainWindow.getPosition();
    param.mainWindow.setPosition(x + subX, y + subY);

    const [cX, cY] = param.compareWindow.getPosition();

    const x1 = cX + subX;
    const y1 = cY + subY;

    param.compareWindow.setPosition(x1, y1);
    propertyInfo.compareWindow.x = x1;
    propertyInfo.compareWindow.y = y1;
    syncPropInfoToMainWindow();
  });

  ipcMain.on('changeImageSize', (v, width: string, height: string) => {
    setCompareWindowSize(
      Number.parseInt(width, 10),
      Number.parseInt(height, 10)
    );
  });

  ipcMain.on(
    'selectImage',
    (
      v,
      imageItem: {
        name: string;
        /**
         * 本地文件路径
         */
        path: string;
        /**
         * 本地文件转成src后的路径
         */
        srcPath: string;
        size: number;
        type: string;
      }
    ) => {
      param.compareWindow.webContents.send('setImage', imageItem);
    }
  );

  ipcMain.on('imageNaturalSize', (v, width: number, height: number) => {
    propertyInfo.imageNaturalSize.width = width;
    propertyInfo.imageNaturalSize.height = height;

    const display = screen.getDisplayNearestPoint(
      screen.getCursorScreenPoint()
    );
    const workArea = display.workArea;

    const result = getSuitableSize({
      screenWidth: workArea.width,
      screenHeight: workArea.height,
      imageWidth: width,
      imageHeight: height
    });

    const x = workArea.x + result.x;
    const y = workArea.y + result.y;

    setCompareWindowPosition(x, y);
    setCompareWindowSize(result.width, result.height);
  });
}
