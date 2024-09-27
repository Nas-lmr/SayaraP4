/**
 * This method transfert any rawData object to an array
 * @version 0.0.1
 * @author Patouillard Franck<patouillardfranck3@gmail.com>
 * @param rawData
 */
export const rowDataRoomToArray = (rawData: any) => Object.values(JSON.parse(JSON.stringify(rawData)));