const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const [deployer] = await ethers.getSigners();
    const deployerAddress = await deployer.getAddress();
    
    return { game, deployerAddress };
  }
  it('should be a winner', async function () {
    const { game, deployerAddress } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.write(deployerAddress);
    await game.win(deployerAddress);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
