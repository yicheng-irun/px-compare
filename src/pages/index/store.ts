import { defineStore } from 'pinia'

export interface ConfigType {
  opacity: number;
}

export interface ImagePropInfo {
  imageNaturalSize: {
    width: number;
    height: number;
  };
  compareWindow: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface MainState {
  config: ConfigType;
  imagePropInfo: ImagePropInfo;
}

export const useMainStore = defineStore("mainPage", {
  state() {
    const initData: MainState =  {
      config: {
        opacity: 0.5
      },
      imagePropInfo: {
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
      }
    };
    return initData;
  }
})