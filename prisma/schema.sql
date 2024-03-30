-- CreateTable
CREATE TABLE "Archive" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "publishedDate" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "favSongUrl" TEXT
);

