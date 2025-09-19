import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import type { Layer, Color } from "@/types/canvas";

const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 16,

  // ✅ moved here in v1.10+
  async resolveUsers({ userIds }) {
    // Used only for Comments. Return a list of user information retrieved
    // from `userIds`. This info is used in comments, mentions etc.

    // Example:
    // const usersData = await __fetchUsersFromDB__(userIds);
    // return usersData.map((userData) => ({
    //   id: userData.id,
    //   name: userData.name,
    //   avatar: userData.avatar.src,
    // }));

    return userIds.map((id) => ({
      id,
      name: `User ${id}`,
      avatar: `https://api.dicebear.com/6.x/thumbs/svg?seed=${id}`,
    }));
  },

  async resolveMentionSuggestions({ text, roomId }) {
    // Used only for Comments. Return a list of userIds that match `text`.

    // Example:
    // const userIds = await __fetchAllUserIdsFromDB__(roomId);
    // if (!text) return userIds;
    // return userIds.filter((userId) =>
    //   userId.toLowerCase().includes(text.toLowerCase())
    // );

    return [];
  },
});

// Presence represents the properties that exist on every user in the Room
type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  pencilColor: Color | null;
};

// Storage = shared state in the Room
type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

// UserMeta = static info about each user
type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

// RoomEvent = custom events
type RoomEvent = {};

// ThreadMetadata = metadata for Comments
export type ThreadMetadata = {};

export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(
  client
);
