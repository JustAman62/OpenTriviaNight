export type Game = {
    id: string;
    players: [Player];
    lastWinner: string | undefined;
    rounds: {[category: string]: Question[]}[];
    currentRound: number;
    state: GameState;
}

export type Player = {
    username: string;
    score: number;
    role: "Host" | "Contestant" | "Spectator";
}

export type Question = {
    questionId: string;
    detail: string;
    correctAnswer: string;
    value: number;
    answered: Boolean;
}

export type GameState = GSWaitingToStart | GSPickAQuestion | GSReadQuestion | GSWaitingForAnswer | GSCheckAnswer | GSFinished;

export type GSWaitingToStart = {
    state: "WaitingToStart";
}

export type GSPickAQuestion = {
    state: "PickAQuestion";
}

export type GSReadQuestion = {
    state: "ReadQuestion";
    question: Question;
}

export type GSWaitingForAnswer = {
    state: "WaitingForAnswer";
    question: Question;
}

export type GSCheckAnswer = {
    state: "CheckAnswer";
    question: Question;
    player: Player;
}

export type GSFinished = {
    state: "Finished";
}

export type CreateGameRequest = {
    username: string,
    rounds: {[category: string]: Question[]}[]
}