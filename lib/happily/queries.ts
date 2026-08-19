import { notFound } from "next/navigation";

import { happilyClient } from "./client";
import { getEventEnv, getEventId } from "./config";
import type {
  HappilyEnv,
  PublicAttendeesData,
  PublicEventData,
  PublicPhotoData,
} from "./types";

type PublicQueryOptions = {
  eventId?: string;
  env?: HappilyEnv;
};

export async function getPublicEvent({
  eventId = getEventId(),
  env = getEventEnv(),
}: PublicQueryOptions = {}): Promise<PublicEventData> {
  const { data, error } = await happilyClient.GET("/api/public/{eventId}", {
    params: {
      path: { eventId },
      query: { env },
    },
  });

  if (error) {
    if ("code" in error && error.code === "NOT_FOUND") {
      notFound();
    }

    throw new Error(error.error);
  }

  if (!data) {
    notFound();
  }

  return data as PublicEventData;
}

/**
 * Same fetch as getPublicEvent, but never throws and never 404s the page.
 * This is a marketing site, not the event site: if Arrived is unreachable or
 * the event is deleted, the rest of the page should still render.
 */
export async function getPublicEventOptional({
  eventId = getEventId(),
  env = getEventEnv(),
}: PublicQueryOptions = {}): Promise<PublicEventData | null> {
  try {
    const { data, error } = await happilyClient.GET("/api/public/{eventId}", {
      params: {
        path: { eventId },
        query: { env },
      },
    });

    if (error || !data) {
      return null;
    }

    return data as PublicEventData;
  } catch {
    return null;
  }
}

export async function getPublicPhotos({
  eventId = getEventId(),
  env = getEventEnv(),
  page = 1,
  pageSize = 48,
}: PublicQueryOptions & {
  page?: number;
  pageSize?: number;
} = {}): Promise<PublicPhotoData> {
  const { data, error } = await happilyClient.GET(
    "/api/public/{eventId}/photos",
    {
      params: {
        path: { eventId },
        query: { env, page, page_size: pageSize },
      },
    },
  );

  if (error) {
    throw new Error(error.error);
  }

  if (!data) {
    notFound();
  }

  return data as PublicPhotoData;
}

export async function getPublicAttendees({
  eventId = getEventId(),
  env = getEventEnv(),
  page = 1,
  pageSize = 12,
}: PublicQueryOptions & {
  page?: number;
  pageSize?: number;
} = {}): Promise<PublicAttendeesData | null> {
  const { data, error } = await happilyClient.GET(
    "/api/public/{eventId}/attendees",
    {
      params: {
        path: { eventId },
        query: { env, page, page_size: pageSize },
      },
    },
  );

  if (error) {
    return null;
  }

  return (data as PublicAttendeesData | undefined) ?? null;
}
