const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };

  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);

    const signer = (await ethers.getSigners()).filter((s) => (String(s.address).startsWith('0x00') && ((parseInt(s.address, 16) < parseInt('0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf', 16)))))

    // good luck
    await game.connect(signer[0]).win();
    
    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
