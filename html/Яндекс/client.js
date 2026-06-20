// Подключаемся к вашему серверу (внешний URL)
var socket = io('https://test-server-5bnb.onrender.com');
socket.isReady = false;

window.addEventListener('load', function() {

    var execInUnity = function(method) {
        if (!socket.isReady) return;
        var args = Array.prototype.slice.call(arguments, 1);
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage("NetworkManager", method, args.join(':'));
        }
    };

    socket.on('PONG', function(socket_id, msg) {
        var currentUserAtr = socket_id + ':' + msg;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnPrintPongMsg', currentUserAtr);
        }
    });

    socket.on('JOIN_SUCCESS', function(id, name, posX, posY, posZ, model) {
        var currentUserAtr = id + ':' + name + ':' + posX + ':' + posY + ':' + posZ + ':' + model;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnJoinGame', currentUserAtr);
        }
    });

    socket.on('SPAWN_PLAYER', function(id, name, posX, posY, posZ, model) {
        var currentUserAtr = id + ':' + name + ':' + posX + '':' + posY + ':' + posZ + ':' + model;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnSpawnPlayer', currentUserAtr);
        }
    });

    socket.on('SPAWN_VEHICLE', function(id, name, model, posX, posY, posZ, currentState, myClientId) {
        var current_vehicle = id + ':' + name + ':' + model + ':' + posX + ':' + posY + ':' + posZ + ':' + currentState + ':' + myClientId;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnSpawnVehicle', current_vehicle);
        }
    });

    socket.on('EMIT_VEHICLE_POS_AND_ROT', function(id, posX, posY, posZ, rotation, spherePosX, spherePosY, spherePosZ) {
        var current_vehicle = id + ':' + posX + ':' + posY + ':' + posZ + ':' + rotation + ':' + spherePosX + ':' + spherePosY + ':' + spherePosZ;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateVehiclePosAndRot', current_vehicle);
        }
    });

    socket.on('UPDATE_VEHICLE_STATE', function(myClientId, id, currentState) {
        var current_vehicle = myClientId + ':' + id + ':' + currentState;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateVehicleState', current_vehicle);
        }
    });

    socket.on('UPDATE_VEHICLE_ACCELERATION', function(id, acceleration) {
        var current_vehicle = id + ':' + acceleration;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateVehicleAcceleration', current_vehicle);
        }
    });

    socket.on('UPDATE_OFFSPIN', function(id, offSpin) {
        var current_vehicle = id + ':' + offSpin;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateVehicleOffSpin', current_vehicle);
        }
    });

    socket.on('UPDATE_FRONT_WHEELS_ROT', function(id, wheels_rot) {
        var current_vehicle = id + ':' + wheels_rot;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateFrontWheelsRotation', current_vehicle);
        }
    });

    socket.on('UPDATE_VEHICLE_INPUTS', function(id, h, v) {
        var current_vehicle = id + ':' + h + ':' + v;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateVehicleInputs', current_vehicle);
        }
    });

    socket.on('UPDATE_MOVE_AND_ROTATE', function(id, posX, posY, posZ, rotation) {
        var currentUserAtr = id + ':' + posX + ':' + posY + ':' + posZ + ':' + rotation;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateMoveAndRotate', currentUserAtr);
        }
    });

    socket.on('UPDATE_PLAYER_ANIMATOR', function(id, key, value, type) {
        var currentUserAtr = id + ':' + key + ':' + value + ':' + type;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateAnim', currentUserAtr);
        }
    });

    socket.on('UPDATE_USER_LIST', function(id, name, publicAddress) {
        var currentUserAtr = id + ':' + name + ':' + publicAddress;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateUsersList', currentUserAtr);
        }
    });

    socket.on('RECEIVE_OPEN_CHAT_BOX', function(host_id, guest_id) {
        var currentUserAtr = host_id + ':' + guest_id;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnReceiveOpenChatBox', currentUserAtr);
        }
    });

    socket.on('UPDATE_MESSAGE', function(id, message) {
        var currentUserAtr = id + ':' + message;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnReceiveMessage', currentUserAtr);
        }
    });

    socket.on('UPDATE_PRIVATE_MESSAGE', function(_chat_box_id, host_id, message) {
        var currentUserAtr = _chat_box_id + ':' + host_id + ':' + message;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnReceivePrivateMessage', currentUserAtr);
        }
    });

    socket.on('UPDATE_CONFIRM_TRANSACTION', function(amount) {
        var currentUserAtr = amount + ':' + '';
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnConfirmTransaction', currentUserAtr);
        }
    });

    socket.on('SEND_USER_VOICE_INFO', function(id) {
        var currentUserAtr = id + ':' + '';
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUpdateUserVoiceInfo', currentUserAtr);
        }
    });

    socket.on('USER_DISCONNECTED', function(id) {
        var currentUserAtr = id;
        if (window.unityInstance != null) {
            window.unityInstance.SendMessage('NetworkManager', 'OnUserDisconnected', currentUserAtr);
        }
    });

}); // END window.addEventListener

// Остальные функции (аудио и т.д.) если есть – можно оставить
// ...