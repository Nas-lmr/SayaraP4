import io from "socket.io-client";
import {ApiConfig} from "../config/apiConfig.ts";

export const socket = io(ApiConfig.private.socketUri);