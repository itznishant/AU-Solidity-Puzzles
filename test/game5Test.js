const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    const address = 0x0;

    return { game, address };
  }
  it('should be a winner', async function () {
    const { game, address} = await loadFixture(deployContractAndSetVariables);

    // good luck

    await game.win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
