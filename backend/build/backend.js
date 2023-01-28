/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handleMessage": () => (/* binding */ handleMessage)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
/* harmony import */ var _handlers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./handlers */ "./handlers/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const allowedMessageTypes = Object.values(_interfaces__WEBPACK_IMPORTED_MODULE_1__.ClientMessageType);
const handleMessage = (message, token = '') => __awaiter(void 0, void 0, void 0, function* () {
    const { type } = message;
    const typeAllowed = allowedMessageTypes.includes(type);
    if (!typeAllowed) {
        console.log('handle message: тип не разрешён', type);
        return 400;
    }
    const handler = _handlers__WEBPACK_IMPORTED_MODULE_3__.handlersMap[type];
    try {
        const messageData = message.data;
        if (message.type === _interfaces__WEBPACK_IMPORTED_MODULE_1__.ClientMessageType.CheckToken) {
            message.data;
        }
        const validationResult = handler.schema.validate(messageData);
        if (validationResult.error) {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.logError)('validation error', validationResult.error);
            return 400;
        }
        if (handler.noAuth) {
            const result = yield handler.callback({ messageData });
            return result;
        }
        else {
            const sender = _entities__WEBPACK_IMPORTED_MODULE_2__.UsersManager.find(token);
            if (!sender) {
                return 401;
            }
            const result = yield handler.callback({
                messageData,
                sender,
            });
            return result;
        }
    }
    catch (err) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.logError)('message handler:', err);
        return 500;
    }
});


/***/ }),

/***/ "./entities/index.ts":
/*!***************************!*\
  !*** ./entities/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Room": () => (/* reexport safe */ _room__WEBPACK_IMPORTED_MODULE_1__.Room),
/* harmony export */   "RoomsManager": () => (/* reexport safe */ _rooms_manager__WEBPACK_IMPORTED_MODULE_3__.RoomsManager),
/* harmony export */   "User": () => (/* reexport safe */ _user__WEBPACK_IMPORTED_MODULE_0__.User),
/* harmony export */   "UsersManager": () => (/* reexport safe */ _users_manager__WEBPACK_IMPORTED_MODULE_2__.UsersManager)
/* harmony export */ });
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user */ "./entities/user.ts");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./room */ "./entities/room.ts");
/* harmony import */ var _users_manager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./users-manager */ "./entities/users-manager.ts");
/* harmony import */ var _rooms_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rooms-manager */ "./entities/rooms-manager.ts");






/***/ }),

/***/ "./entities/room-lobby.ts":
/*!********************************!*\
  !*** ./entities/room-lobby.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoomLobby": () => (/* binding */ RoomLobby)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");

class RoomLobby {
    constructor(data) {
        const { creator, password } = data;
        this.players = {
            [_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Top]: creator,
            [_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Bottom]: null,
        };
        this.password = password || null;
    }
    get isSecured() {
        return !!this.password;
    }
    get playersList() {
        const { top, bottom } = this.players;
        const list = [];
        if (top)
            list.push(top);
        if (bottom)
            list.push(bottom);
        return list;
    }
    get actors() {
        var _a, _b;
        const { bottom, top } = this.players;
        return {
            [_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Top]: (_a = top === null || top === void 0 ? void 0 : top.serialize()) !== null && _a !== void 0 ? _a : null,
            [_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Bottom]: (_b = bottom === null || bottom === void 0 ? void 0 : bottom.serialize()) !== null && _b !== void 0 ? _b : null,
        };
    }
    get hasPlace() {
        const { bottom, top } = this.players;
        return !(bottom && top);
    }
    hasPlayer(userId) {
        const { top, bottom } = this.players;
        return (top === null || top === void 0 ? void 0 : top.id) == userId || (bottom === null || bottom === void 0 ? void 0 : bottom.id) == userId;
    }
    addPlayer(user, password) {
        if (!this.hasPlace || this.hasPlayer(user.id) || !this.checkPassword(password)) {
            return false;
        }
        const { top, bottom } = this.players;
        if (!top) {
            this.players[_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Top] = user;
        }
        if (!bottom) {
            this.players[_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Bottom] = user;
        }
        return true;
    }
    removeUser(id) {
        for (const key in this.players) {
            const side = key;
            const player = this.players[side];
            if ((player === null || player === void 0 ? void 0 : player.id) == id) {
                this.players[side] = null;
                return player;
            }
        }
        return null;
    }
    swapUsers() {
        const { bottom, top } = this.players;
        this.players = {
            bottom: top,
            top: bottom,
        };
    }
    checkPassword(password) {
        const noPassword = !this.password;
        const passwordValid = password === this.password;
        return noPassword || passwordValid;
    }
}


/***/ }),

/***/ "./entities/room.ts":
/*!**************************!*\
  !*** ./entities/room.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Room": () => (/* binding */ Room)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! #entities */ "../shared/entities/index.ts");
/* harmony import */ var _room_lobby__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./room-lobby */ "./entities/room-lobby.ts");




class Room {
    constructor(data) {
        const { title, password, creator } = data;
        this.id = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.getUniqueString)();
        this.title = title;
        this.creator = creator;
        this.lobby = new _room_lobby__WEBPACK_IMPORTED_MODULE_3__.RoomLobby({ creator, password });
        // TODO: Возможность выбирать настройки
        const config = {
            tableType: _interfaces__WEBPACK_IMPORTED_MODULE_0__.TableType.Basic,
            multipleAttacks: true,
            mustBeat: true,
        };
        this.savedConfig = config;
        this.game = _entities__WEBPACK_IMPORTED_MODULE_2__.Game.createNew({ config });
    }
    makeStep(initiator, move) {
        const gameAlreadyFinished = !!this.game.winnerSide;
        if (gameAlreadyFinished) {
            return false;
        }
        const isPlayer = this.lobby.hasPlayer(initiator.id);
        if (!isPlayer) {
            return false;
        }
        const activeActor = this.lobby.actors[this.game.turnOf];
        const isActiveActor = activeActor && activeActor.id === initiator.id;
        if (!isActiveActor) {
            return false;
        }
        const unitMoveResult = this.game.moveUnit(move);
        return unitMoveResult;
    }
    restartGame() {
        const { savedConfig } = this;
        this.game = _entities__WEBPACK_IMPORTED_MODULE_2__.Game.createNew({ config: savedConfig });
    }
    ;
    get winner() {
        const { game, lobby } = this;
        const { winnerSide } = game;
        const { actors } = lobby;
        return winnerSide && actors[winnerSide];
    }
    get shortInfo() {
        const { baseInfo } = this;
        const { playersList } = this.lobby;
        return Object.assign(Object.assign({}, baseInfo), { playersCount: playersList.length });
    }
    get fullInfo() {
        const { baseInfo, game, creator, lobby } = this;
        const { actors } = lobby;
        const gameSnapshot = game.snapshot();
        return Object.assign(Object.assign({}, baseInfo), { creatorId: creator.id, actors,
            gameSnapshot });
    }
    get baseInfo() {
        const { id, title } = this;
        const { isSecured } = this.lobby;
        return { id, title, isSecured };
    }
}


/***/ }),

/***/ "./entities/rooms-manager.ts":
/*!***********************************!*\
  !*** ./entities/rooms-manager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RoomsManager": () => (/* binding */ RoomsManager)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");

var RoomsManager;
(function (RoomsManager) {
    const roomsSet = new _utils__WEBPACK_IMPORTED_MODULE_0__.ObjectSet([]);
    RoomsManager.getList = () => roomsSet.elements;
    RoomsManager.getShortInfoList = () => roomsSet.elements.map(room => room.shortInfo);
    RoomsManager.find = (id) => roomsSet.find(id);
    RoomsManager.findRoomWithUser = (userId) => {
        const room = roomsSet.elements.find((room) => room.lobby.hasPlayer(userId));
        return room;
    };
    RoomsManager.addRoom = (room) => {
        roomsSet.insert(room);
    };
    RoomsManager.removeRoom = (id) => {
        roomsSet.remove(id);
    };
})(RoomsManager || (RoomsManager = {}));


/***/ }),

/***/ "./entities/user.ts":
/*!**************************!*\
  !*** ./entities/user.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "User": () => (/* binding */ User)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mockCommunicator = {
    closeConnection: () => { },
    send: (message) => __awaiter(void 0, void 0, void 0, function* () {
        return {
            success: true,
            message,
            receiverId: '',
        };
    })
};
class User {
    constructor(data) {
        const { id, token, name, communicator } = data;
        this.id = id;
        this.token = token;
        this.name = name;
        this.communicator = communicator !== null && communicator !== void 0 ? communicator : mockCommunicator;
    }
    get wasConnected() {
        return this.communicator != mockCommunicator;
    }
    changeCommunicator(newCommunicator) {
        this.communicator.closeConnection();
        this.communicator = newCommunicator;
    }
    serialize() {
        const { id, name } = this;
        return { id, name };
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.communicator.send(message);
        });
    }
}


/***/ }),

/***/ "./entities/users-manager.ts":
/*!***********************************!*\
  !*** ./entities/users-manager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UsersManager": () => (/* binding */ UsersManager)
/* harmony export */ });
var UsersManager;
(function (UsersManager) {
    const usersMap = new Map();
    UsersManager.getList = () => Array.from(usersMap.values());
    UsersManager.find = (token) => {
        var _a;
        return (_a = usersMap.get(token)) !== null && _a !== void 0 ? _a : null;
    };
    UsersManager.add = (user) => {
        usersMap.set(user.token, user);
    };
    UsersManager.remove = (token) => {
        usersMap.delete(token);
    };
})(UsersManager || (UsersManager = {}));


/***/ }),

/***/ "./handlers/check-token.ts":
/*!*********************************!*\
  !*** ./handlers/check-token.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkToken": () => (/* binding */ checkToken)
/* harmony export */ });
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const checkToken = {
    noAuth: true,
    schema: _schemas__WEBPACK_IMPORTED_MODULE_0__.clientSchemas.checkToken,
    callback: ({ messageData }) => __awaiter(void 0, void 0, void 0, function* () {
        const { token } = messageData;
        const user = _entities__WEBPACK_IMPORTED_MODULE_1__.UsersManager.find(token);
        if (!user) {
            return {
                valid: false,
            };
        }
        return Object.assign({ valid: true }, user.serialize());
    }),
};


/***/ }),

/***/ "./handlers/create-room.ts":
/*!*********************************!*\
  !*** ./handlers/create-room.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRoom": () => (/* binding */ createRoom)
/* harmony export */ });
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const createRoom = {
    schema: _schemas__WEBPACK_IMPORTED_MODULE_0__.clientSchemas.createRoom,
    callback: ({ messageData, sender }) => __awaiter(void 0, void 0, void 0, function* () {
        const { title, password } = messageData;
        const room = new _entities__WEBPACK_IMPORTED_MODULE_1__.Room({
            creator: sender,
            title,
            password,
        });
        _entities__WEBPACK_IMPORTED_MODULE_1__.RoomsManager.addRoom(room);
        return {
            roomInfo: room.fullInfo,
        };
    }),
};


/***/ }),

/***/ "./handlers/get-rooms.ts":
/*!*******************************!*\
  !*** ./handlers/get-rooms.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRooms": () => (/* binding */ getRooms)
/* harmony export */ });
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


const getRooms = {
    schema: _schemas__WEBPACK_IMPORTED_MODULE_0__.clientSchemas.getRooms,
    callback: () => __awaiter(void 0, void 0, void 0, function* () {
        const rooms = _entities__WEBPACK_IMPORTED_MODULE_1__.RoomsManager.getShortInfoList();
        return {
            rooms,
        };
    }),
};


/***/ }),

/***/ "./handlers/index.ts":
/*!***************************!*\
  !*** ./handlers/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "handlersMap": () => (/* binding */ handlersMap)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _check_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./check-token */ "./handlers/check-token.ts");
/* harmony import */ var _create_room__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./create-room */ "./handlers/create-room.ts");
/* harmony import */ var _get_rooms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./get-rooms */ "./handlers/get-rooms.ts");
/* harmony import */ var _join_room__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./join-room */ "./handlers/join-room.ts");
/* harmony import */ var _log_in__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./log-in */ "./handlers/log-in.ts");
/* harmony import */ var _make_step__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./make-step */ "./handlers/make-step.ts");
/* harmony import */ var _swap_players__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./swap-players */ "./handlers/swap-players.ts");








const handlersMap = {
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.CheckToken]: _check_token__WEBPACK_IMPORTED_MODULE_1__.checkToken,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.CreateRoom]: _create_room__WEBPACK_IMPORTED_MODULE_2__.createRoom,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.GetRooms]: _get_rooms__WEBPACK_IMPORTED_MODULE_3__.getRooms,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.JoinRoom]: _join_room__WEBPACK_IMPORTED_MODULE_4__.joinRoom,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.LogIn]: _log_in__WEBPACK_IMPORTED_MODULE_5__.logIn,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.MakeStep]: _make_step__WEBPACK_IMPORTED_MODULE_6__.makeStep,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType.SwapPlayers]: _swap_players__WEBPACK_IMPORTED_MODULE_7__.swapPlayers,
};


/***/ }),

/***/ "./handlers/join-room.ts":
/*!*******************************!*\
  !*** ./handlers/join-room.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "joinRoom": () => (/* binding */ joinRoom)
/* harmony export */ });
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ "./services/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const joinRoom = {
    schema: _schemas__WEBPACK_IMPORTED_MODULE_0__.clientSchemas.joinRoom,
    callback: ({ messageData, sender }) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomId, password } = messageData;
        const room = _entities__WEBPACK_IMPORTED_MODULE_2__.RoomsManager.find(roomId);
        if (!room) {
            return {
                joined: false,
                reason: 'Комната не найдена',
            };
        }
        const { lobby } = room;
        if (!lobby.checkPassword(password)) {
            return {
                joined: false,
                reason: 'Неправильный пароль',
            };
        }
        if (!lobby.hasPlace) {
            return {
                joined: false,
                reason: 'Комната заполнена',
            };
        }
        if (lobby.hasPlayer(sender.id)) {
            return {
                joined: false,
                reason: 'Вы уже в этой комнате',
            };
        }
        const joined = lobby.addPlayer(sender, password);
        if (!joined) {
            return {
                joined: false,
                reason: 'Непредвиденная ошибка',
            };
        }
        const { playersList } = lobby;
        console.log('lobby:', playersList);
        const result = yield (0,_services__WEBPACK_IMPORTED_MODULE_1__.broadcastRoomFullInfo)(room, playersList);
        console.log('broadcast result', result);
        return {
            joined: true,
            roomInfo: room.fullInfo,
        };
    }),
};


/***/ }),

/***/ "./handlers/log-in.ts":
/*!****************************!*\
  !*** ./handlers/log-in.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logIn": () => (/* binding */ logIn)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const logIn = {
    noAuth: true,
    schema: _schemas__WEBPACK_IMPORTED_MODULE_1__.clientSchemas.logIn,
    callback: ({ messageData }) => __awaiter(void 0, void 0, void 0, function* () {
        const id = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getUniqueString)();
        const token = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getUniqueString)();
        const { name } = messageData;
        const user = new _entities__WEBPACK_IMPORTED_MODULE_2__.User({
            id,
            token,
            name,
            communicator: null,
        });
        _entities__WEBPACK_IMPORTED_MODULE_2__.UsersManager.add(user);
        // Если пользователь не подключился за указанное время, удаляем его
        setTimeout(() => {
            if (!user.wasConnected) {
                _entities__WEBPACK_IMPORTED_MODULE_2__.UsersManager.remove(token);
            }
        }, 30 * 1000);
        return {
            id,
            token,
            name,
        };
    }),
};


/***/ }),

/***/ "./handlers/make-step.ts":
/*!*******************************!*\
  !*** ./handlers/make-step.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "makeStep": () => (/* binding */ makeStep)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services */ "./services/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const makeStep = {
    schema: _schemas__WEBPACK_IMPORTED_MODULE_1__.clientSchemas.makeStep,
    callback: ({ messageData, sender }) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomId, move } = messageData;
        const room = _entities__WEBPACK_IMPORTED_MODULE_2__.RoomsManager.find(roomId);
        if (!room) {
            return { success: false };
        }
        const successStep = room.makeStep(sender, move);
        if (!successStep) {
            return { success: false };
        }
        const { playersList } = room.lobby;
        yield (0,_services__WEBPACK_IMPORTED_MODULE_3__.broadcastRoomFullInfo)(room, playersList);
        const { winner } = room;
        if (winner) {
            yield (0,_services__WEBPACK_IMPORTED_MODULE_3__.broadcastService)({
                users: playersList,
                message: {
                    type: _interfaces__WEBPACK_IMPORTED_MODULE_0__.ServerMessageType.GameOver,
                    data: {
                        roomId: room.id,
                        winner,
                    }
                }
            });
        }
        return {
            success: true,
        };
    }),
};


/***/ }),

/***/ "./handlers/swap-players.ts":
/*!**********************************!*\
  !*** ./handlers/swap-players.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "swapPlayers": () => (/* binding */ swapPlayers)
/* harmony export */ });
/* harmony import */ var _schemas__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../schemas */ "./schemas/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services */ "./services/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../entities */ "./entities/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const swapPlayers = {
    schema: _schemas__WEBPACK_IMPORTED_MODULE_0__.clientSchemas.swapPlayers,
    callback: ({ messageData, sender }) => __awaiter(void 0, void 0, void 0, function* () {
        const { roomId } = messageData;
        const room = _entities__WEBPACK_IMPORTED_MODULE_2__.RoomsManager.find(roomId);
        if (!room) {
            return { swapped: false };
        }
        if (room.creator.id != sender.id) {
            return { swapped: false };
        }
        const { lobby } = room;
        lobby.swapUsers();
        yield (0,_services__WEBPACK_IMPORTED_MODULE_1__.broadcastRoomFullInfo)(room, lobby.playersList);
        return { swapped: true };
    }),
};


/***/ }),

/***/ "./schemas/from-client.ts":
/*!********************************!*\
  !*** ./schemas/from-client.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkToken": () => (/* binding */ checkToken),
/* harmony export */   "createRoom": () => (/* binding */ createRoom),
/* harmony export */   "getRooms": () => (/* binding */ getRooms),
/* harmony export */   "joinRoom": () => (/* binding */ joinRoom),
/* harmony export */   "logIn": () => (/* binding */ logIn),
/* harmony export */   "makeStep": () => (/* binding */ makeStep),
/* harmony export */   "swapPlayers": () => (/* binding */ swapPlayers)
/* harmony export */ });
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! joi */ "joi");
/* harmony import */ var joi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(joi__WEBPACK_IMPORTED_MODULE_0__);

const requiredString = joi__WEBPACK_IMPORTED_MODULE_0___default().string().min(1).required();
const password = joi__WEBPACK_IMPORTED_MODULE_0___default().string().allow('');
const checkToken = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    token: requiredString,
});
const createRoom = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    title: joi__WEBPACK_IMPORTED_MODULE_0___default().string()
        .min(1)
        .required(),
    password,
});
const getRooms = joi__WEBPACK_IMPORTED_MODULE_0___default().object({});
const joinRoom = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    roomId: requiredString,
    password,
});
const logIn = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    name: requiredString,
});
// [number, number]
const position = joi__WEBPACK_IMPORTED_MODULE_0___default().array()
    .items(joi__WEBPACK_IMPORTED_MODULE_0___default().number().required(), joi__WEBPACK_IMPORTED_MODULE_0___default().number().required())
    .required();
const move = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    from: position,
    to: position,
});
const makeStep = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    roomId: requiredString,
    move,
});
const swapPlayers = joi__WEBPACK_IMPORTED_MODULE_0___default().object({
    roomId: requiredString,
});


/***/ }),

/***/ "./schemas/index.ts":
/*!**************************!*\
  !*** ./schemas/index.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "clientSchemas": () => (/* reexport module object */ _from_client__WEBPACK_IMPORTED_MODULE_0__)
/* harmony export */ });
/* harmony import */ var _from_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./from-client */ "./schemas/from-client.ts");




/***/ }),

/***/ "./services/broadcast-room-full-info.ts":
/*!**********************************************!*\
  !*** ./services/broadcast-room-full-info.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "broadcastRoomFullInfo": () => (/* binding */ broadcastRoomFullInfo)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _broadcast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./broadcast */ "./services/broadcast.ts");


const broadcastRoomFullInfo = (room, users) => {
    return (0,_broadcast__WEBPACK_IMPORTED_MODULE_1__.broadcastService)({
        users,
        message: {
            type: _interfaces__WEBPACK_IMPORTED_MODULE_0__.ServerMessageType.RoomData,
            data: {
                roomFullInfo: room.fullInfo,
            }
        }
    });
};


/***/ }),

/***/ "./services/broadcast.ts":
/*!*******************************!*\
  !*** ./services/broadcast.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "broadcastService": () => (/* binding */ broadcastService)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const broadcastService = ({ users, message, }) => __awaiter(void 0, void 0, void 0, function* () {
    const promises = users.map(user => user.sendMessage(message));
    const results = yield Promise.all(promises);
    const notSentMessages = results.filter(result => !result.success);
    return {
        notSentMessages,
    };
});


/***/ }),

/***/ "./services/index.ts":
/*!***************************!*\
  !*** ./services/index.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebsocketCommunicator": () => (/* reexport safe */ _websocket_communicator__WEBPACK_IMPORTED_MODULE_2__.WebsocketCommunicator),
/* harmony export */   "broadcastRoomFullInfo": () => (/* reexport safe */ _broadcast_room_full_info__WEBPACK_IMPORTED_MODULE_0__.broadcastRoomFullInfo),
/* harmony export */   "broadcastService": () => (/* reexport safe */ _broadcast__WEBPACK_IMPORTED_MODULE_1__.broadcastService)
/* harmony export */ });
/* harmony import */ var _broadcast_room_full_info__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./broadcast-room-full-info */ "./services/broadcast-room-full-info.ts");
/* harmony import */ var _broadcast__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./broadcast */ "./services/broadcast.ts");
/* harmony import */ var _websocket_communicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./websocket-communicator */ "./services/websocket-communicator.ts");





/***/ }),

/***/ "./services/websocket-communicator.ts":
/*!********************************************!*\
  !*** ./services/websocket-communicator.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WebsocketCommunicator": () => (/* binding */ WebsocketCommunicator)
/* harmony export */ });
class WebsocketCommunicator {
    constructor(data) {
        const { socket, receiverId } = data;
        this.socket = socket;
        this.receiverId = receiverId;
    }
    closeConnection() {
        this.socket.terminate();
    }
    send(message) {
        return new Promise((resolve) => {
            const { receiverId } = this;
            const sentMessage = {
                receiverId,
                message,
                success: true,
            };
            const messageJson = JSON.stringify(message);
            this.socket.send(messageJson, (err) => {
                if (err) {
                    console.error('User.send:', err.message);
                    resolve(Object.assign(Object.assign({}, sentMessage), { success: false }));
                }
                ;
                resolve(sentMessage);
            });
        });
    }
}


/***/ }),

/***/ "../shared/constants/directions.ts":
/*!*****************************************!*\
  !*** ../shared/constants/directions.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "bottomLeft": () => (/* binding */ bottomLeft),
/* harmony export */   "bottomRight": () => (/* binding */ bottomRight),
/* harmony export */   "diagonalArr": () => (/* binding */ diagonalArr),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "topLeft": () => (/* binding */ topLeft),
/* harmony export */   "topRight": () => (/* binding */ topRight)
/* harmony export */ });
const top = [0, -1];
const topLeft = [-1, -1];
const topRight = [1, -1];
const bottom = [0, 1];
const bottomLeft = [-1, 1];
const bottomRight = [1, 1];
const diagonalArr = [
    topLeft,
    topRight,
    bottomRight,
    bottomLeft,
];


/***/ }),

/***/ "../shared/constants/index.ts":
/*!************************************!*\
  !*** ../shared/constants/index.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "directions": () => (/* reexport module object */ _directions__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "oppositeSides": () => (/* reexport safe */ _opposite_sides__WEBPACK_IMPORTED_MODULE_1__.oppositeSides)
/* harmony export */ });
/* harmony import */ var _directions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./directions */ "../shared/constants/directions.ts");
/* harmony import */ var _opposite_sides__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./opposite-sides */ "../shared/constants/opposite-sides.ts");





/***/ }),

/***/ "../shared/constants/opposite-sides.ts":
/*!*********************************************!*\
  !*** ../shared/constants/opposite-sides.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "oppositeSides": () => (/* binding */ oppositeSides)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");

const oppositeSides = {
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Bottom]: _interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Top,
    [_interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Top]: _interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Bottom,
};


/***/ }),

/***/ "../shared/entities/game.ts":
/*!**********************************!*\
  !*** ../shared/entities/game.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #constants */ "../shared/constants/index.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tables */ "../shared/entities/tables/index.ts");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./unit */ "../shared/entities/unit.ts");
/* harmony import */ var _units_controller__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./units-controller */ "../shared/entities/units-controller.ts");






class Game {
    get winnerSide() { return this._winnerSide; }
    get turnOf() { return this._turnOf; }
    constructor(data) {
        this._winnerSide = null;
        const { config, turnOf, table, units, lockedUnit } = data;
        this.config = config;
        this._turnOf = turnOf;
        this.table = table;
        this.unitsController = new _units_controller__WEBPACK_IMPORTED_MODULE_5__.UnitsController(units);
        this.lockedUnit = lockedUnit && new _unit__WEBPACK_IMPORTED_MODULE_4__.Unit(lockedUnit);
    }
    static createNew(data) {
        const { config } = data;
        const table = (0,_tables__WEBPACK_IMPORTED_MODULE_3__.createTable)(config.tableType);
        const units = (0,_utils__WEBPACK_IMPORTED_MODULE_2__.generateInitialUnits)(table);
        return new Game({
            config,
            turnOf: _interfaces__WEBPACK_IMPORTED_MODULE_1__.GameSide.Bottom,
            table,
            units,
        });
    }
    static load(snapshot) {
        const { config, turnOf, units, lockedUnit } = snapshot;
        const table = (0,_tables__WEBPACK_IMPORTED_MODULE_3__.createTable)(config.tableType);
        return new Game({
            config,
            turnOf,
            table,
            units,
            lockedUnit,
        });
    }
    snapshot() {
        const { config, turnOf, unitsController, lockedUnit } = this;
        const units = unitsController.list();
        return {
            config,
            turnOf,
            units,
            lockedUnit,
        };
    }
    findAvailableSteps(side = this.turnOf) {
        const { lockedUnit, config } = this;
        if (config.multipleAttacks && lockedUnit) {
            // Ищем ходы только для lockedUnit'a.
            // Поиск ходов для другой стороны не должен ограничиваться этим юнитом
            if (lockedUnit.side === side) {
                return {
                    [lockedUnit.id]: this.findAttackSteps(lockedUnit),
                };
            }
        }
        const unitsOfSide = this.unitsController.list(side);
        // Составляем список доступных атак для юнитов
        const attackStepsMap = {};
        unitsOfSide.forEach((unit) => {
            const attackSteps = this.findAttackSteps(unit);
            const hasAttackSteps = attackSteps.length > 0;
            if (hasAttackSteps) {
                attackStepsMap[unit.id] = attackSteps;
            }
        });
        const someUnitCanAttack = Object.values(attackStepsMap).length > 0;
        if (config.mustBeat && someUnitCanAttack) {
            return attackStepsMap;
        }
        else {
            // Добавляем доступные перемещения к найденным ранее атакам.
            // Если доступных атак не было, просто ставим доступные перемещения
            const allStepsMap = Object.assign({}, attackStepsMap);
            unitsOfSide.forEach((unit) => {
                var _a;
                const moveSteps = this.findMoveSteps(unit);
                const hasMoveSteps = moveSteps.length > 0;
                if (hasMoveSteps) {
                    const existingSteps = (_a = allStepsMap[unit.id]) !== null && _a !== void 0 ? _a : [];
                    allStepsMap[unit.id] = existingSteps.concat(moveSteps);
                }
            });
            return allStepsMap;
        }
    }
    moveUnit(move) {
        const { from, to } = move;
        const destinationOutside = this.table.isOutside(to);
        if (destinationOutside) {
            return false;
        }
        const selectedUnit = this.unitsController.unitOn(from);
        if (!selectedUnit) {
            return false;
        }
        const invalidSide = selectedUnit.side !== this.turnOf;
        if (invalidSide) {
            return false;
        }
        const availableStepsMap = this.findAvailableSteps(selectedUnit.side);
        const availableStepsOfUnit = availableStepsMap[selectedUnit.id];
        if (!availableStepsOfUnit.length) {
            return false;
        }
        const selectedStep = availableStepsOfUnit
            .find(step => (0,_utils__WEBPACK_IMPORTED_MODULE_2__.samePos)(step.destination, to));
        const stepUnavailable = !selectedStep;
        if (stepUnavailable) {
            return false;
        }
        this.applyStep(selectedStep, selectedUnit);
        return true;
    }
    applyStep(step, unit) {
        const { type, destination } = step;
        unit.position = destination; // перемещаем юнита
        const movedToUpgradeZone = this.table.isUpgradeZone(destination, unit.side);
        if (movedToUpgradeZone) { // улучшаем юнита если добрался до зоны улучшения
            unit.upgrade();
        }
        if (type === _interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack) { // ход - атака
            const { config, unitsController } = this;
            step.affectedUnits.forEach(unit => {
                unitsController.kill(unit.id);
            });
            const availableAttacks = this.findAttackSteps(unit);
            const unitHasAvailableAttacks = availableAttacks.length > 0;
            if (config.multipleAttacks && unitHasAvailableAttacks) {
                this.lockedUnit = unit;
            }
            else {
                this.finishTurn();
            }
        }
        if (type === _interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move) {
            this.finishTurn();
        }
    }
    finishTurn() {
        const { turnOf: currentSide } = this;
        const nextSide = _constants__WEBPACK_IMPORTED_MODULE_0__.oppositeSides[currentSide];
        this.lockedUnit = undefined;
        this._turnOf = nextSide;
        const nextSideUnits = this.unitsController.list(nextSide);
        const nextSideHasUnits = nextSideUnits.length > 0;
        const nextSideStepsMap = this.findAvailableSteps(nextSide);
        const nextSideHasAvailableSteps = Object.values(nextSideStepsMap).length > 0;
        if (!nextSideHasUnits || !nextSideHasAvailableSteps) {
            this._winnerSide = currentSide;
        }
    }
    findAttackSteps(unit) {
        const [x0, y0] = unit.position;
        const attackSteps = [];
        for (const direction of unit.attackDirections) {
            const [xV, yV] = direction;
            for (let i = 1; i <= unit.maxMoveDistance; i++) {
                const x = x0 + xV * i;
                const y = y0 + yV * i;
                const currentPos = [x, y];
                const nextPos = [x + xV, y + yV];
                const currentPositionOutsideOfMap = this.table.isOutside(currentPos);
                const nextPositionOutsideOfMap = this.table.isOutside(nextPos);
                if (currentPositionOutsideOfMap || nextPositionOutsideOfMap)
                    break;
                const currentUnit = this.unitsController.unitOn(currentPos);
                const positionIsEmpty = currentUnit === null;
                if (positionIsEmpty)
                    continue;
                const metOwnUnit = currentUnit.side === unit.side;
                if (metOwnUnit)
                    break;
                const nextUnit = this.unitsController.unitOn(nextPos);
                const nextPositionIsEmpty = nextUnit === null;
                if (nextPositionIsEmpty) {
                    attackSteps.push({
                        type: _interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack,
                        from: unit.position,
                        destination: nextPos,
                        affectedUnits: [currentUnit],
                    });
                }
            }
        }
        return attackSteps;
    }
    findMoveSteps(unit) {
        const [x0, y0] = unit.position;
        const moveSteps = [];
        for (const direction of unit.moveDirections) {
            const [xV, yV] = direction;
            for (let i = 1; i <= unit.maxMoveDistance; i++) {
                const x = x0 + xV * i;
                const y = y0 + yV * i;
                const currentPos = [x, y];
                const currentPositionOutsideOfMap = this.table.isOutside(currentPos);
                if (currentPositionOutsideOfMap)
                    break;
                const currentUnit = this.unitsController.unitOn(currentPos);
                const positionIsEmpty = currentUnit === null;
                if (!positionIsEmpty)
                    break;
                moveSteps.push({
                    type: _interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move,
                    from: unit.position,
                    destination: currentPos,
                });
            }
        }
        return moveSteps;
    }
}


/***/ }),

/***/ "../shared/entities/index.ts":
/*!***********************************!*\
  !*** ../shared/entities/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* reexport safe */ _game__WEBPACK_IMPORTED_MODULE_0__.Game)
/* harmony export */ });
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "../shared/entities/game.ts");
/* harmony import */ var _tables__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tables */ "../shared/entities/tables/index.ts");




/***/ }),

/***/ "../shared/entities/tables/basic-table.ts":
/*!************************************************!*\
  !*** ../shared/entities/tables/basic-table.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BasicTable": () => (/* binding */ BasicTable)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");

class BasicTable {
    constructor() {
        this.type = _interfaces__WEBPACK_IMPORTED_MODULE_0__.TableType.Basic;
        this.height = 6;
        this.width = 6;
    }
    isOutside(pos) {
        const { width, height } = this;
        const [x, y] = pos;
        return [
            x < 0,
            y < 0,
            x > width - 1,
            y > height - 1,
        ].some(Boolean);
    }
    isUpgradeZone(pos, forSide) {
        const { height } = this;
        const [, y] = pos;
        if (forSide === _interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Top) {
            return y === height - 1;
        }
        if (forSide === _interfaces__WEBPACK_IMPORTED_MODULE_0__.GameSide.Bottom) {
            return y === 0;
        }
        return false;
    }
}


/***/ }),

/***/ "../shared/entities/tables/index.ts":
/*!******************************************!*\
  !*** ../shared/entities/tables/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTable": () => (/* binding */ createTable)
/* harmony export */ });
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");
/* harmony import */ var _basic_table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./basic-table */ "../shared/entities/tables/basic-table.ts");


const createTable = (tableType) => {
    if (tableType === _interfaces__WEBPACK_IMPORTED_MODULE_0__.TableType.Basic) {
        return new _basic_table__WEBPACK_IMPORTED_MODULE_1__.BasicTable();
    }
    throw new Error(`createTable: Тип стола '${tableType}' не поддерживается`);
};


/***/ }),

/***/ "../shared/entities/unit.ts":
/*!**********************************!*\
  !*** ../shared/entities/unit.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Unit": () => (/* binding */ Unit)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #constants */ "../shared/constants/index.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");


class Unit {
    constructor(data) {
        const { id, side, type, position } = data;
        this.id = id;
        this.side = side;
        this.type = type;
        this.position = position;
    }
    get maxMoveDistance() {
        return maxMoveDistance[this.type];
    }
    get moveDirections() {
        const { side, type } = this;
        return stepDirections[side][type][_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move];
    }
    get attackDirections() {
        const { side, type } = this;
        return stepDirections[side][type][_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack];
    }
    upgrade() {
        if (this.type === _interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Basic) {
            this.type = _interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Special;
        }
    }
    cut() {
        const { id, side, type, position } = this;
        return {
            id,
            side,
            type,
            position
        };
    }
}
const maxMoveDistance = {
    [_interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Basic]: 1,
    [_interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Special]: Infinity,
};
const stepDirections = {
    [_interfaces__WEBPACK_IMPORTED_MODULE_1__.GameSide.Bottom]: {
        [_interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Basic]: {
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move]: [
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.top,
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.topLeft,
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.topRight,
            ],
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack]: _constants__WEBPACK_IMPORTED_MODULE_0__.directions.diagonalArr,
        },
        [_interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Special]: {
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move]: [
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.top,
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.bottom,
                ..._constants__WEBPACK_IMPORTED_MODULE_0__.directions.diagonalArr,
            ],
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack]: _constants__WEBPACK_IMPORTED_MODULE_0__.directions.diagonalArr,
        },
    },
    [_interfaces__WEBPACK_IMPORTED_MODULE_1__.GameSide.Top]: {
        [_interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Basic]: {
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move]: [
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.bottom,
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.bottomLeft,
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.bottomRight,
            ],
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack]: _constants__WEBPACK_IMPORTED_MODULE_0__.directions.diagonalArr,
        },
        [_interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Special]: {
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Move]: [
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.top,
                _constants__WEBPACK_IMPORTED_MODULE_0__.directions.bottom,
                ..._constants__WEBPACK_IMPORTED_MODULE_0__.directions.diagonalArr,
            ],
            [_interfaces__WEBPACK_IMPORTED_MODULE_1__.StepType.Attack]: _constants__WEBPACK_IMPORTED_MODULE_0__.directions.diagonalArr,
        },
    },
};


/***/ }),

/***/ "../shared/entities/units-controller.ts":
/*!**********************************************!*\
  !*** ../shared/entities/units-controller.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnitsController": () => (/* binding */ UnitsController)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./unit */ "../shared/entities/unit.ts");


class UnitsController {
    constructor(units) {
        this.units = new _utils__WEBPACK_IMPORTED_MODULE_0__.ObjectSet(units.map(unit => new _unit__WEBPACK_IMPORTED_MODULE_1__.Unit(unit)));
    }
    unitOn(position) {
        const [x0, y0] = position;
        const unit = this.units.elements.find((unit) => {
            const [x, y] = unit.position;
            return x0 === x && y0 === y;
        });
        return unit !== null && unit !== void 0 ? unit : null;
    }
    kill(id) {
        const removedUnit = this.units.remove(id);
        return removedUnit;
    }
    list(side) {
        const { elements: unitsList } = this.units;
        if (side !== undefined) {
            return unitsList.filter(unit => unit.side === side);
        }
        return unitsList;
    }
}


/***/ }),

/***/ "../shared/interfaces/game.ts":
/*!************************************!*\
  !*** ../shared/interfaces/game.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "GameSide": () => (/* binding */ GameSide)
/* harmony export */ });
var GameSide;
(function (GameSide) {
    GameSide["Top"] = "top";
    GameSide["Bottom"] = "bottom";
})(GameSide || (GameSide = {}));


/***/ }),

/***/ "../shared/interfaces/helpers.ts":
/*!***************************************!*\
  !*** ../shared/interfaces/helpers.ts ***!
  \***************************************/
/***/ (() => {




/***/ }),

/***/ "../shared/interfaces/index.ts":
/*!*************************************!*\
  !*** ../shared/interfaces/index.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientMessageType": () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType),
/* harmony export */   "GameSide": () => (/* reexport safe */ _game__WEBPACK_IMPORTED_MODULE_1__.GameSide),
/* harmony export */   "ServerMessageType": () => (/* reexport safe */ _messages__WEBPACK_IMPORTED_MODULE_0__.ServerMessageType),
/* harmony export */   "StepType": () => (/* reexport safe */ _step__WEBPACK_IMPORTED_MODULE_4__.StepType),
/* harmony export */   "TableType": () => (/* reexport safe */ _table__WEBPACK_IMPORTED_MODULE_6__.TableType),
/* harmony export */   "UnitType": () => (/* reexport safe */ _unit__WEBPACK_IMPORTED_MODULE_7__.UnitType)
/* harmony export */ });
/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./messages */ "../shared/interfaces/messages/index.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "../shared/interfaces/game.ts");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "../shared/interfaces/helpers.ts");
/* harmony import */ var _room__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./room */ "../shared/interfaces/room.ts");
/* harmony import */ var _step__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./step */ "../shared/interfaces/step.ts");
/* harmony import */ var _table_grid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./table-grid */ "../shared/interfaces/table-grid.ts");
/* harmony import */ var _table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./table */ "../shared/interfaces/table.ts");
/* harmony import */ var _unit__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./unit */ "../shared/interfaces/unit.ts");
/* harmony import */ var _user__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user */ "../shared/interfaces/user.ts");











/***/ }),

/***/ "../shared/interfaces/messages/client-server.ts":
/*!******************************************************!*\
  !*** ../shared/interfaces/messages/client-server.ts ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientMessageType": () => (/* binding */ ClientMessageType)
/* harmony export */ });
var ClientMessageType;
(function (ClientMessageType) {
    ClientMessageType["LogIn"] = "LogIn";
    ClientMessageType["CheckToken"] = "CheckToken";
    ClientMessageType["CreateRoom"] = "CreateRoom";
    ClientMessageType["GetRooms"] = "GetRooms";
    ClientMessageType["JoinRoom"] = "JoinRoom";
    ClientMessageType["SwapPlayers"] = "SwapPlayers";
    ClientMessageType["MakeStep"] = "MakeStep";
})(ClientMessageType || (ClientMessageType = {}));


/***/ }),

/***/ "../shared/interfaces/messages/from-server.ts":
/*!****************************************************!*\
  !*** ../shared/interfaces/messages/from-server.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerMessageType": () => (/* binding */ ServerMessageType)
/* harmony export */ });
var ServerMessageType;
(function (ServerMessageType) {
    ServerMessageType["UserData"] = "userData";
    ServerMessageType["RoomData"] = "roomData";
    ServerMessageType["GameOver"] = "gameOver";
    ServerMessageType["CreatorLeft"] = "creatorLeft";
})(ServerMessageType || (ServerMessageType = {}));


/***/ }),

/***/ "../shared/interfaces/messages/index.ts":
/*!**********************************************!*\
  !*** ../shared/interfaces/messages/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientMessageType": () => (/* reexport safe */ _client_server__WEBPACK_IMPORTED_MODULE_0__.ClientMessageType),
/* harmony export */   "ServerMessageType": () => (/* reexport safe */ _from_server__WEBPACK_IMPORTED_MODULE_1__.ServerMessageType)
/* harmony export */ });
/* harmony import */ var _client_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-server */ "../shared/interfaces/messages/client-server.ts");
/* harmony import */ var _from_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./from-server */ "../shared/interfaces/messages/from-server.ts");




/***/ }),

/***/ "../shared/interfaces/room.ts":
/*!************************************!*\
  !*** ../shared/interfaces/room.ts ***!
  \************************************/
/***/ (() => {




/***/ }),

/***/ "../shared/interfaces/step.ts":
/*!************************************!*\
  !*** ../shared/interfaces/step.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "StepType": () => (/* binding */ StepType)
/* harmony export */ });
var StepType;
(function (StepType) {
    StepType["Move"] = "move";
    StepType["Attack"] = "attack";
})(StepType || (StepType = {}));


/***/ }),

/***/ "../shared/interfaces/table-grid.ts":
/*!******************************************!*\
  !*** ../shared/interfaces/table-grid.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony export CellType */
var CellType;
(function (CellType) {
    CellType["Void"] = "void";
    CellType["Basic"] = "basic";
})(CellType || (CellType = {}));


/***/ }),

/***/ "../shared/interfaces/table.ts":
/*!*************************************!*\
  !*** ../shared/interfaces/table.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TableType": () => (/* binding */ TableType)
/* harmony export */ });
var TableType;
(function (TableType) {
    TableType["Basic"] = "basic";
    TableType["Another"] = "another";
})(TableType || (TableType = {}));


/***/ }),

/***/ "../shared/interfaces/unit.ts":
/*!************************************!*\
  !*** ../shared/interfaces/unit.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UnitType": () => (/* binding */ UnitType)
/* harmony export */ });
var UnitType;
(function (UnitType) {
    UnitType["Basic"] = "basic";
    UnitType["Special"] = "special";
})(UnitType || (UnitType = {}));


/***/ }),

/***/ "../shared/interfaces/user.ts":
/*!************************************!*\
  !*** ../shared/interfaces/user.ts ***!
  \************************************/
/***/ (() => {




/***/ }),

/***/ "../shared/utils/generate-initial-units.ts":
/*!*************************************************!*\
  !*** ../shared/utils/generate-initial-units.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateInitialUnits": () => (/* binding */ generateInitialUnits)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _interfaces__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! #interfaces */ "../shared/interfaces/index.ts");


const makeBasicUnit = (position, side) => {
    return {
        id: (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getUniqueString)(),
        side,
        type: _interfaces__WEBPACK_IMPORTED_MODULE_1__.UnitType.Basic,
        position,
    };
};
// TODO: Разная генерация для разных карт
const generateInitialUnits = (table) => {
    const { width, height } = table;
    const units = [];
    const rowsPerSide = 2;
    // top units
    for (let y = 0; y < rowsPerSide; y++) {
        for (let x = y % 2; x < width; x += 2) {
            const newUnit = makeBasicUnit([x, y], _interfaces__WEBPACK_IMPORTED_MODULE_1__.GameSide.Top);
            units.push(newUnit);
        }
    }
    // bottom units
    for (let padY = 0; padY < rowsPerSide; padY++) {
        const y = height - padY - 1;
        for (let x = y % 2; x < width; x += 2) {
            const newUnit = makeBasicUnit([x, y], _interfaces__WEBPACK_IMPORTED_MODULE_1__.GameSide.Bottom);
            units.push(newUnit);
        }
    }
    return units;
};


/***/ }),

/***/ "../shared/utils/get-unique-string.ts":
/*!********************************************!*\
  !*** ../shared/utils/get-unique-string.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getUniqueString": () => (/* binding */ getUniqueString)
/* harmony export */ });
const getUniqueString = () => {
    return Math.random().toString(16).slice(2) + (new Date()).getTime() + Math.random().toString(16).slice(2);
};


/***/ }),

/***/ "../shared/utils/index.ts":
/*!********************************!*\
  !*** ../shared/utils/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectSet": () => (/* reexport safe */ _object_set__WEBPACK_IMPORTED_MODULE_2__.ObjectSet),
/* harmony export */   "generateInitialUnits": () => (/* reexport safe */ _generate_initial_units__WEBPACK_IMPORTED_MODULE_4__.generateInitialUnits),
/* harmony export */   "getUniqueString": () => (/* reexport safe */ _get_unique_string__WEBPACK_IMPORTED_MODULE_0__.getUniqueString),
/* harmony export */   "logError": () => (/* reexport safe */ _log_error__WEBPACK_IMPORTED_MODULE_1__.logError),
/* harmony export */   "samePos": () => (/* reexport safe */ _position_utils__WEBPACK_IMPORTED_MODULE_3__.samePos)
/* harmony export */ });
/* harmony import */ var _get_unique_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-unique-string */ "../shared/utils/get-unique-string.ts");
/* harmony import */ var _log_error__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./log-error */ "../shared/utils/log-error.ts");
/* harmony import */ var _object_set__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./object-set */ "../shared/utils/object-set.ts");
/* harmony import */ var _position_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./position-utils */ "../shared/utils/position-utils.ts");
/* harmony import */ var _generate_initial_units__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./generate-initial-units */ "../shared/utils/generate-initial-units.ts");







/***/ }),

/***/ "../shared/utils/log-error.ts":
/*!************************************!*\
  !*** ../shared/utils/log-error.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "logError": () => (/* binding */ logError)
/* harmony export */ });
const logError = (text, err) => {
    let errInfo = err;
    if (err instanceof Error) {
        errInfo = err.message;
    }
    console.error(text, errInfo);
};


/***/ }),

/***/ "../shared/utils/object-set.ts":
/*!*************************************!*\
  !*** ../shared/utils/object-set.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ObjectSet": () => (/* binding */ ObjectSet)
/* harmony export */ });
/* unused harmony export ReadonlyObjectSet */
/* Как Set, только для работы с объектами по id */
class ReadonlyObjectSet {
    get elements() { return this._elements.slice(); }
    constructor(initialElements) {
        const elementsMap = initialElements.reduce((acc, curr) => {
            acc[curr.id] = curr;
            return acc;
        }, {});
        const uniqueElements = Object.values(elementsMap);
        this._elements = uniqueElements;
    }
    get length() { return this._elements.length; }
    find(id) {
        return this._elements.find(element => element.id === id);
    }
    has(id) {
        return !!this.find(id);
    }
}
class ObjectSet extends ReadonlyObjectSet {
    /**
     * Если элемент с таким id уже есть, ничего не произойдёт
     */
    insert(obj) {
        const alreadyExists = this.has(obj.id);
        if (alreadyExists) {
            return false;
        }
        this._elements.push(obj);
        return true;
    }
    remove(id) {
        const element = this.find(id);
        if (!element) {
            return null;
        }
        const elementIndex = this._elements.indexOf(element);
        const [removedElement] = this._elements.splice(elementIndex, 1);
        return removedElement;
    }
}


/***/ }),

/***/ "../shared/utils/position-utils.ts":
/*!*****************************************!*\
  !*** ../shared/utils/position-utils.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "samePos": () => (/* binding */ samePos)
/* harmony export */ });
const samePos = (pos1, pos2) => {
    return pos1[0] === pos2[0] && pos1[1] === pos2[1];
};


/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "joi":
/*!**********************!*\
  !*** external "joi" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("joi");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("ws");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************!*\
  !*** ./index.ts ***!
  \******************/
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cors */ "cors");
/* harmony import */ var cors__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(cors__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! #utils */ "../shared/utils/index.ts");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./services/index.ts");
/* harmony import */ var _entities__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./entities */ "./entities/index.ts");
/* harmony import */ var _app__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./app */ "./app.ts");
/* harmony import */ var _shared_interfaces_messages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../shared/interfaces/messages */ "../shared/interfaces/messages/index.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








const httpServer = express__WEBPACK_IMPORTED_MODULE_1___default()();
httpServer.use(express__WEBPACK_IMPORTED_MODULE_1___default().json());
httpServer.use(cors__WEBPACK_IMPORTED_MODULE_2___default()());
httpServer.post('/game', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers['authorization'];
    const result = yield (0,_app__WEBPACK_IMPORTED_MODULE_6__.handleMessage)(req.body, token);
    if (typeof result === 'object') {
        res.status(200).send(JSON.stringify(result));
    }
    else {
        res.sendStatus(result);
    }
}));
httpServer.listen(7000);
const wsServer = new (ws__WEBPACK_IMPORTED_MODULE_0___default().Server)({
    port: 7001,
});
wsServer.on('connection', (socket, req) => {
    try {
        const reqUrl = new URL(req.url, `http://${req.headers.host}`);
        const token = reqUrl.searchParams.get('token');
        if (!token) {
            console.log('no token', req.url);
            socket.terminate();
            return;
        }
        const user = _entities__WEBPACK_IMPORTED_MODULE_5__.UsersManager.find(token);
        if (!user) {
            console.log('no user', token);
            socket.terminate();
            return;
        }
        const communicator = new _services__WEBPACK_IMPORTED_MODULE_4__.WebsocketCommunicator({
            socket,
            receiverId: user.id,
        });
        user.changeCommunicator(communicator);
        user.sendMessage({
            type: _shared_interfaces_messages__WEBPACK_IMPORTED_MODULE_7__.ServerMessageType.UserData,
            data: {
                userData: user.serialize(),
            },
        });
        // Если пользователь переподключился во время игры, отправляем ему данные его комнаты
        const roomWithUser = _entities__WEBPACK_IMPORTED_MODULE_5__.RoomsManager.findRoomWithUser(user.id);
        if (roomWithUser) {
            user.sendMessage({
                type: _shared_interfaces_messages__WEBPACK_IMPORTED_MODULE_7__.ServerMessageType.RoomData,
                data: {
                    roomFullInfo: roomWithUser.fullInfo,
                }
            });
        }
    }
    catch (err) {
        (0,_utils__WEBPACK_IMPORTED_MODULE_3__.logError)('error wsServer on connection', err);
    }
});

})();

/******/ })()
;
//# sourceMappingURL=backend.js.map