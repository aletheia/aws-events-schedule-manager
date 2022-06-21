export interface User {
  name: string;
  surname: string;
}

export interface Event {
  uuid: string;
  key: string;
  name: string;
}

export interface SerializedSession {
  alias: string;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  venue?: {
    name: string;
  };
  room?: {
    name: string;
  };
}

export interface Session {
  name: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  location?: string;
}
