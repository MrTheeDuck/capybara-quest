controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (Capybara.vy == 0) {
        Capybara.vy = -125
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    game.gameOver(false)
    game.setGameOverEffect(false, effects.slash)
})
function startlevel () {
    if (current_level == 0) {
        tiles.setCurrentTilemap(tilemap`level2`)
        game.showLongText("Level 1:     SKY", DialogLayout.Center)
    } else {
        tiles.setCurrentTilemap(tilemap`level4`)
    }
    scene.setBackgroundImage(assets.image`myImage6`)
    tiles.placeOnRandomTile(Capybara, assets.tile`myTile9`)
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        tiles.setTileAt(value, assets.tile`transparency16`)
    }
    Capybara.ay = 200
    scene.cameraFollowSprite(Capybara)
    info.setLife(3)
    for (let value2 of sprites.allOfKind(SpriteKind.Enemy)) {
        sprites.destroy(value2)
    }
    for (let value3 of sprites.allOfKind(SpriteKind.Food)) {
        sprites.destroy(value3)
    }
    for (let value4 of tiles.getTilesByType(assets.tile`myTile5`)) {
        Lettuce = sprites.create(assets.image`myImage0`, SpriteKind.Food)
        animation.runImageAnimation(
        Lettuce,
        assets.animation`myAnim`,
        200,
        true
        )
        tiles.placeOnTile(Lettuce, value4)
        tiles.setTileAt(value4, assets.tile`transparency16`)
    }
    for (let value5 of tiles.getTilesByType(assets.tile`myTile6`)) {
        Tiger = sprites.create(assets.image`myImage`, SpriteKind.Enemy)
        tiles.placeOnTile(Tiger, value5)
        tiles.setTileAt(value5, assets.tile`transparency16`)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile2`, function (sprite, location) {
    current_level += 1
    startlevel()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    sprites.destroy(otherSprite)
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    if (Capybara.y < otherSprite.y) {
        info.changeScoreBy(3)
    } else {
        info.changeLifeBy(-1)
    }
})
let Tiger: Sprite = null
let Lettuce: Sprite = null
let Capybara: Sprite = null
let current_level = 0
game.showLongText("Welcome To Capybara Quest!", DialogLayout.Bottom)
game.showLongText("Use The arrow keys (<, >) to move and use Space/A button to jump!", DialogLayout.Bottom)
game.showLongText("Your Objective is to collect lettuce and defeat enemies!    Good Luck!", DialogLayout.Bottom)
current_level = 0
Capybara = sprites.create(assets.image`Capybara`, SpriteKind.Player)
controller.moveSprite(Capybara, 100, 0)
startlevel()
game.onUpdate(function () {
    Capybara.setImage(assets.image`Capybara`)
    if (Capybara.vy < 0) {
        Capybara.setImage(assets.image`Capybara0`)
    } else {
    	
    }
    if (Capybara.vx < 0) {
        Capybara.image.flipX()
    }
})
