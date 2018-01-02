export interface ILooseObject {
    [key: string]: any;
}

export class Broadcaster implements ILooseObject {
    [key: string]: any;
    broadcasterLanguage: string = "";
    emoteOnly: boolean = false;
    followersOnly: number = -1;
    mercury: boolean = false;
    r9k: boolean = false;
    rituals: boolean = false;
    roomId: number = -1;
    slow: boolean = false;
    subsOnly: boolean = false;
}

export class Message implements ILooseObject {
    // todo: implement badges and emotes
    [key: string]: any;
    badges: string = "";
    color: string = "";
    displayName: string = "";
    emotes: string = "";
    id: string = "";
    mod: boolean = false;
    roomId: number = -1;
    subscriber: boolean = false;
    tmiSentTs: number = -1;
    turbo: boolean = false;
    userId: number = -1;
    userType: string = "";
    content: string = "";
    channel: string = "";
    broadcaster: Broadcaster;
}