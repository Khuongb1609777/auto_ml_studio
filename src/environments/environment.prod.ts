/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
export const environment = {
  production: true,
  apiUrl:
    window["env"]["apiUrl"] || "https://rpa-iot-dev-api.innoria.com/parse",
  appId: window["env"]["appId"] || "d91b47af8bd27e39704139d448340365",
};
